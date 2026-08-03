import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 10 },
    { duration: "30s", target: 20 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<1000"],
  },
};

const BASE_URL = __ENV.API_BASE_URL || "http://localhost:5090";

export default function () {
  const services = http.get(`${BASE_URL}/api/services`);
  check(services, {
    "services is not 500": (response) => response.status !== 500,
    "services is 200 or rate limited": (response) => [200, 429].includes(response.status),
  });

  const projects = http.get(`${BASE_URL}/api/projects`);
  check(projects, {
    "projects is not 500": (response) => response.status !== 500,
    "projects is 200 or rate limited": (response) => [200, 429].includes(response.status),
  });

  const health = http.get(`${BASE_URL}/health`);
  check(health, {
    "health responds": (response) => [200, 503].includes(response.status),
  });

  sleep(1);
}

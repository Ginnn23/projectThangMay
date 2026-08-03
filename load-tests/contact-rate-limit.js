import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 5,
  thresholds: {
    http_req_failed: ["rate<0.25"],
  },
};

const BASE_URL = __ENV.API_BASE_URL || "http://localhost:5090";

export default function () {
  const payload = JSON.stringify({
    fullName: "Khach test",
    phoneNumber: `0909000${__ITER}`,
    email: `loadtest${__ITER}@example.com`,
    subject: "Tu van va khao sat",
    message: "Day la noi dung kiem thu gioi han gui form lien he tren moi truong local.",
  });

  const response = http.post(`${BASE_URL}/api/contacts`, payload, {
    headers: { "Content-Type": "application/json" },
  });

  check(response, {
    "contact is created, accepted duplicate, or rate limited": (res) => [200, 201, 429].includes(res.status),
    "contact is not 500": (res) => res.status !== 500,
  });

  sleep(0.2);
}

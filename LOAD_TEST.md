# Load Test Local

Các kịch bản này chỉ dùng cho môi trường local/test, không chạy vào production hoặc dịch vụ của người khác.

## Cài k6

Windows:

```powershell
winget install k6.k6
```

## Chạy API đọc công khai

```powershell
$env:API_BASE_URL="http://localhost:5090"
k6 run load-tests/public-read.js
```

Kịch bản tăng từ 1 lên 20 virtual users trong khoảng 50 giây, gọi:

- `GET /api/services`
- `GET /api/projects`
- `GET /health`

Tiêu chí demo mong muốn:

- Không có HTTP 500.
- Tỷ lệ lỗi dưới 1%.
- p95 response time dưới khoảng 1000 ms trên máy local phù hợp.

## Chạy kiểm tra giới hạn form liên hệ

```powershell
$env:API_BASE_URL="http://localhost:5090"
k6 run load-tests/contact-rate-limit.js
```

Kịch bản này chỉ gửi vài request để xác nhận API trả `201/200` cho request hợp lệ hoặc trùng, và `429` khi vượt giới hạn. Không dùng để tạo dữ liệu rác số lượng lớn.

## Ghi kết quả thực tế

Sau khi chạy, ghi lại:

- Máy test: CPU/RAM.
- Số virtual users.
- Tổng request.
- Tỷ lệ lỗi.
- p95 response time.
- Có HTTP 500 hay không.
- Health check còn phản hồi hay không.

Không kết luận hệ thống chịu được số người dùng lớn hơn số đã test.

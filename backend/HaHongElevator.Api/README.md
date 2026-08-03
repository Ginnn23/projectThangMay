# HaHongElevator.Api

Backend API cho website Thang MĂ¡y HĂ  Há»“ng.

## CĂ´ng nghá»‡

- ASP.NET Core Web API (.NET 8)
- Controller-based API
- Entity Framework Core
- PostgreSQL qua Npgsql
- JWT Bearer Authentication
- BCrypt.Net-Next
- Swagger / OpenAPI

## Cáº¥u hĂ¬nh PostgreSQL

Cáº­p nháº­t `appsettings.json` hoáº·c biáº¿n mĂ´i trÆ°á»ng:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=HaHongElevatorDb;Username=postgres;Password=YOUR_PASSWORD"
}
```

KhĂ´ng commit máº­t kháº©u tháº­t vĂ o source code. CĂ³ thá»ƒ dĂ¹ng user secrets hoáº·c biáº¿n mĂ´i trÆ°á»ng khi triá»ƒn khai.

## Cáº¥u hĂ¬nh JWT

Trong `appsettings.json`:

```json
"Jwt": {
  "Key": "REPLACE_WITH_A_LONG_RANDOM_SECRET_KEY_AT_LEAST_32_CHARS",
  "Issuer": "HaHongElevator.Api",
  "Audience": "HaHongElevator.Client",
  "ExpiresMinutes": 120
}
```

Khi cháº¡y tháº­t, thay `Jwt:Key` báº±ng chuá»—i bĂ­ máº­t dĂ i, ngáº«u nhiĂªn.

## Migration

CĂ¡c lá»‡nh thÆ°á»ng dĂ¹ng:

```bash
dotnet restore
dotnet build
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Migration `InitialCreate` Ä‘Ă£ Ä‘Æ°á»£c táº¡o. Náº¿u chÆ°a cáº¥u hĂ¬nh Ä‘Æ°á»£c PostgreSQL hoáº·c máº­t kháº©u database, hĂ£y cáº­p nháº­t connection string trÆ°á»›c khi cháº¡y `dotnet ef database update`.

## Cháº¡y API

```bash
dotnet run
```

Swagger trong mĂ´i trÆ°á»ng Development:

```text
/swagger
```

## TĂ i khoáº£n Admin máº·c Ä‘á»‹nh

Khi database chÆ°a cĂ³ admin, há»‡ thá»‘ng seed tĂ i khoáº£n:

- Username: `admin`
- Password: đặt qua biến môi trường `AdminSeed__Password` khi chạy production
- Role: `Admin`

Không dùng mật khẩu demo cho production. Nếu mật khẩu demo từng được commit hoặc dùng thật, hãy đổi/rotate ngay.

## Sá»­ dá»¥ng JWT trĂªn Swagger

1. Gá»i `POST /api/auth/login`.
2. Copy giĂ¡ trá»‹ `token`.
3. Báº¥m nĂºt `Authorize` trong Swagger.
4. Nháº­p token theo dáº¡ng Bearer token.

## API

### Auth

- `POST /api/auth/login`

### Services

Public:

- `GET /api/services`
- `GET /api/services/{id}`
- `GET /api/services/slug/{slug}`

Admin:

- `POST /api/services`
- `PUT /api/services/{id}`
- `DELETE /api/services/{id}`

### Projects

Public:

- `GET /api/projects`
- `GET /api/projects?category=ThangMayGiaDinh&search=quan%2012`
- `GET /api/projects/{id}`
- `GET /api/projects/slug/{slug}`
- `GET /api/projects/featured`

Admin:

- `POST /api/projects`
- `PUT /api/projects/{id}`
- `DELETE /api/projects/{id}`

### Contacts

Public:

- `POST /api/contacts`

Admin:

- `GET /api/contacts`
- `GET /api/contacts/{id}`
- `PUT /api/contacts/{id}/status`
- `DELETE /api/contacts/{id}`

Valid contact statuses:

- `New`
- `Contacted`
- `Processed`
- `Cancelled`

### Uploads

Admin:

- `POST /api/uploads/image`

Accepted file types: `jpg`, `jpeg`, `png`, `webp`.
Max size: 5 MB.
Files are saved to `wwwroot/uploads`.

## Frontend React

CORS currently allows:

- `http://localhost:5173`
- `https://localhost:5173`

Frontend can call the API base URL of this project and include JWT for admin-only endpoints.


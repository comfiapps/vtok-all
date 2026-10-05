# 📂 ApiControllers - API 컨트롤러 계층 명세

`vtok_publishing_web` 서비스의 RESTful HTTP 엔드포인트 수신 계층입니다.

---

## 📄 파일 명세

- **`MittingController.cs`**:
  - `[Route("api")]` 기반의 민팅 통계, 라운드 시각, 지갑 주소 검증 및 승인 컨트롤러.
  - `GET /api/time`: 라운드 및 남은 시각 수신.
  - `GET /api/mitting`: 전체 일정 수신.
  - `GET /api/result`: 당첨 내역 수신.
  - `GET /api/addr/{id}`: 특정 주소 민팅 검증.
  - `GET /api/count/{round}`: 수량 조회 & SignalR `Receive("Count", cnt)` 브로드캐스트.
  - `POST /api/sitin/{id}`: 사전 신청 등록 (`SitinDto`).
  - `POST /api/approval/{id}`: 승인 및 차감 (`MittingDto`).

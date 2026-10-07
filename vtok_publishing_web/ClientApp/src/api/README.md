# 📡 API Client - 프론트엔드 REST API 통신 계층

ASP.NET Core 백엔드(`vtok_publishing_web:5000`)의 RESTful API 엔드포인트와 통신을 담당하는 Axios 기반 클라이언트 모듈입니다.

---

## 📄 파일 명세
* **`request.js`**:
  * Axios 인스턴스 설정 및 공통 에러 핸들러, 타임아웃, Content-Type 헤더 인터셉터 구성.
* **`apiRequests.js`**:
  * `getMintingData()`: `GET /api/time` 호출로 라운드별 시작/종료 일시 및 할당량 수신.
  * `getMintingStatus()`: `GET /api/mitting` 호출로 현재 민팅 상태("Wait", "Start", "End") 확인.
  * `mintAPI(account, recaptchaToken)`: `POST /api/sitin/{account}?token={token}` 호출로 봇 검증 후 사전 등록.
  * `approvalAPI(account, body)`: `POST /api/approval/{account}` 호출로 온체인 트랜잭션 해시 등록 및 승인 요청.

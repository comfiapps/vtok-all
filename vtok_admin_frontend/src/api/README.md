# 📂 src/api - Axios API 연동 레이어 명세

관리자 백오피스의 HTTP REST API 연동 모듈입니다.

---

## 📄 파일 명세

- **`request.js`**:
  - Axios 인스턴스 래퍼 함수 (`apiRequest(config)`).
  - 기본 헤더: `Content-Type: application/json`.
  - HTTP 통신 성공 시 `response.data` 즉시 반환, 에러 발생 시 예외 로깅 처리.

# 📂 Hubs - SignalR Websocket Hub 명세

실시간 웹소켓 통신 브로드캐스트 허브 계층입니다.

---

## 📄 파일 명세

- **`ChatHub.cs`**:
  - `Microsoft.AspNetCore.SignalR.Hub` 상속.
  - 라우트 경로: `/chatHub`
  - 전송 메시지 채널: `Clients.All.SendAsync("Receive", type, data)`
  - 브로드캐스트 이벤트 유형:
    - `"Count"`: 실시간 민팅 카운터 동기화
    - `"Time"`: 라운드 시작/종료 시각 정보
    - `"Web"`: 전체 웹 진입 상태 (`"Start"`, `"End"`)

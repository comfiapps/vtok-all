# 🌐 VTOK Publishing Web (VTOK 메인 퍼블리싱 웹 명세서)

VTOK 플랫폼의 메인 브랜딩 웹사이트, 화이트리스트 사전 등록, 카운트다운 타이머, 3D 하우스 애니메이션 및 실시간 민팅 수량 동기화 서비스를 제공하는 풀스택 웹 프로젝트입니다.

---

## 🛠️ 기술 스택 및 라이브러리 (Tech Stack & Packages)

- **Backend**: C# (ASP.NET Core 5.0 / 6.0 Web API)
- **Real-time Engine**: ASP.NET Core SignalR Websocket (`ChatHub.cs`)
- **In-Memory Cache**: Redis (`StackExchange.Redis`, `NRedisStack`)
- **Database ORM**: Entity Framework Core (`ApiDataContext`, MySQL)
- **Background Worker**: `TimedHostedService` (`IHostedService` 기반 라운드 타이머)
- **Frontend SPA**: React 17+, Material-UI (MUI v5), `@microsoft/signalr`

---

## 🗄️ 데이터베이스 테이블 상세 스키마 (`ApiDataContext`)

- **`SitinAddr` 테이블** (사전 대기열 주소 신청):
  - `Id` (`INT`, PK, Auto Increment)
  - `Addr` (`VARCHAR(255)`): 지갑 주소
  - `Count` (`INT`): 신청한 수량
  - `Date` (`VARCHAR(50)`): 신청 일시 (`yyyy-MM-dd-HH-mm-ss`)

- **`MittingAddr` 테이블** (민팅 최종 승인 및 수락 내역):
  - `Id` (`INT`, PK, Auto Increment)
  - `Addr` (`VARCHAR(255)`): 지갑 주소
  - `Tx_id` (`VARCHAR(255)`): 온체인 트랜잭션 해시
  - `Value` (`VARCHAR(50)`): 암호화폐 금액
  - `Count` (`INT`): 민팅 승인 수량
  - `Round` (`INT`): 민팅 라운드 (1차, 2차 등)
  - `Date` (`VARCHAR(50)`): 승인 완료 일시

---

## 🔌 API 컨트롤러 상세 명세 (`ApiControllers/MittingController.cs`)

| Method | HTTP Path | Request Parameter / Body | Response Schema | 설명 |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/time` | None | `{ round, startTime, endTime, remainTime }` | 현재 민팅 라운드 및 남은 시간(초) 조회 |
| `GET` | `/api/mitting` | None | `MintingTime` 객체 | 전체 민팅 일정 및 라운드 타임 테이블 반환 |
| `GET` | `/api/result` | None | `Result` 배열 | 민팅 당첨 결과 목록 조회 |
| `GET` | `/api/addr/{id}` | `id` (path): 지갑주소 | `MittingAddr` JSON | 해당 지갑의 사전 신청 상태 조회 |
| `GET` | `/api/count/{round}` | `round` (path): 라운드 번호 | `cnt` (int) | 라운드 수량 조회 & SignalR `Receive("Count", cnt)` 브로드캐스트 |
| `POST` | `/api/sitin/{id}` | `id` (path), Body: `SitinDto` | Result object | 사전 대기열 참가 등록 |
| `POST` | `/api/approval/{id}` | `id` (path), Body: `MittingDto` | `cnt` (int) | 민팅 승인, 차감 및 SignalR 실시간 수량 브로드캐스트 |

- **DTO 데이터 구조**:
  - `SitinDto`: `{ string Addr, int Count }`
  - `MittingDto`: `{ string Addr, string Tx_id, string Value, int Count, int Round }`

---

## 📡 SignalR 웹소켓 및 Redis 구성

- **SignalR Hub Endpoint**: `/chatHub`
- **웹소켓 리스너 이벤트**:
  - `Receive("Count", count)`: 민팅 수량이 변경될 때 접속한 모든 웹 브라우저 클라이언트에 실시간 브로드캐스트.
- **Redis 키 구조**:
  - `"minting:count:{round}"`: 라운드별 누적 민팅 카운터 저장
  - `"minting:state"`: 현재 시스템 진행 상태

---

## 📂 파일 레이어 구체적 안내

- **`ApiControllers/MittingController.cs`**: HTTP 요청 처리 및 SignalR Hub 브로드캐스트 유발.
- **`Data/ApiDataContext.cs`**: MySQL `SitinAddr` 및 `MittingAddr` 테이블 매핑 EF Core Context.
- **`Hubs/ChatHub.cs`**: SignalR `Hub` 상속 실시간 통신 허브.
- **`Models/MintingModel.cs`**: `MittingEntity`, `MittingDto`, `Mitting`, `MittingAddr` 모델 객체.
- **`Service/MittingService.cs`**: 라운드 시간 계산 및 Redis/DB 카운팅 비즈니스 로직.
- **`Service/TimedHostedService.cs`**: `IHostedService` 상속 1초 간격 백그라운드 타이머.
- **`Repository/RedisRepository.cs`**: Redis 연결 및 수량 차감(Atomic Decr) 처리.

- **[ClientApp README 바로가기](./ClientApp/README.md)**: React 프론트엔드 상세 명세.

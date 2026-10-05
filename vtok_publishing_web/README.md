# 🌐 VTOK Publishing Web (VTOK 메인 퍼블리싱 웹)

VTOK 플랫폼의 메인 브랜딩 웹사이트, 랜딩페이지, NFT 민팅 현황 및 카운트다운 서비스를 제공하는 풀스택 웹 프로젝트입니다.  
ASP.NET Core Web API를 백엔드로 사용하며, React 기반의 Single Page Application (`ClientApp`)이 통합 통합되어 있으며, SignalR과 Redis를 이용해 실시간 상태 동기화를 제공합니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Backend**: C# (ASP.NET Core 5.0 / 6.0 Web API)
- **Real-time & Caching**: ASP.NET Core SignalR Websocket Hub, Redis Cache (StackExchange.Redis)
- **Database**: Entity Framework Core 5.0 / 6.0 (`ApiDataContext`), MySQL
- **Frontend**: React.js 17+, Material-UI (MUI), Custom CSS Animations
- **Hosting Service**: `TimedHostedService` (배치 및 라운드 타이머 백그라운드 서비스)

---

## 📂 디렉토리 및 레이어 구조 (Architecture & Directory)

```text
vtok_publishing_web/
├── ApiControllers/
│   └── MittingController.cs    # 민팅 시간, 라운드, 참여 승인 및 실시간 카운팅 API
├── ClientApp/                  # React 프론트엔드 어플리케이션 (별도 README 참조)
├── Data/
│   └── ApiDataContext.cs       # Entity Framework Core DB Context
├── Hubs/
│   └── ChatHub.cs              # SignalR 실시간 웹소켓 이벤트 브로드캐스트 허브
├── Models/
│   ├── MintingModel.cs         # 민팅 데이터 전송 객체 (SitinDto, MittingDto)
│   ├── WhitelistModel.cs       # 화이트리스트 검증 모델
│   └── TimeModels.cs           # 민팅 라운드 및 타이머 모델 (Time)
├── Repository/
│   ├── MittingRepository.cs    # DB 기반 민팅 데이터 액세스
│   └── RedisRepository.cs      # Redis 인메모리 카운트 및 세션 처리
├── Service/
│   ├── MittingService.cs       # 민팅 라운드 비즈니스 로직 및 주소 검증
│   └── TimedHostedService.cs   # 백그라운드 루프 실행 타이머 서비스 (IHostedService)
├── Startup.cs / Program.cs     # DI 서비스 등록 및 미들웨어 파이프라인
└── README.md
```

- **[ClientApp README 바로가기](./ClientApp/README.md)**: React 클라이언트 상세 구성 요소 안내.

---

## 🔌 API 명세서 (API Endpoints Specification)

| Method | Endpoint | 설명 | 비고 |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/time` | 현재 민팅 라운드 및 남은 시간(초) 조회 | `Time` 모델 반환 |
| `GET` | `/api/mitting` | 전체 민팅 일정 및 라운드 시간 정보 조회 | - |
| `GET` | `/api/result` | 민팅 결과 및 당첨 정보 조회 | - |
| `GET` | `/api/addr/{id}` | 특정 지갑 주소의 참여 권한/화이트리스트 확인 | `id`: 지갑 주소 |
| `GET` | `/api/count/{round}` | 라운드별 현재 신청/민팅된 수량 카운트 조회 | SignalR `Receive("Count", cnt)` 동시 발송 |
| `POST` | `/api/sitin/{id}` | 사전 신청/대기열 참여 등록 (`SitinDto`) | - |
| `POST` | `/api/approval/{id}` | 민팅 승인 및 수량 차감 (`MittingDto`) | SignalR 실시간 카운트 브로드캐스트 |

---

## 📡 SignalR 웹소켓 허브 (`ChatHub.cs`)

- **Hub Endpoint**: `/chatHub`
- **클라이언트 브로드캐스트 이벤트**:
  - `Receive("Count", countValue)`: 실시간으로 변경되는 민팅 수량을 연결된 모든 웹 클라이언트에 실시간 전송.

---

## ⚙️ 실행 및 빌드 가이드 (Execution)

### 1. 백엔드 실행
```bash
# 의존성 복구 및 실행
dotnet restore
dotnet run
```

### 2. 프론트엔드 (ClientApp) 독립 구동
```bash
cd ClientApp
npm install
npm start
```
웹 브라우저에서 `http://localhost:3000` 접속 후 확인 가능합니다.

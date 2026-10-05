# 🌐 VTOK Publishing Web (VTOK 메인 퍼블리싱 웹)

VTOK 서비스의 메인 브랜드 웹사이트 및 랜딩페이지 서비스입니다.  
ASP.NET Core Web API를 백엔드로 사용하며, React 기반의 Single Page Application (`ClientApp`)이 통합되어 있습니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Backend**: C# (ASP.NET Core 5.0 / 6.0), SignalR, Redis Cache (NRedisStack / StackExchange.Redis), Entity Framework Core
- **Frontend**: React.js, JavaScript, Material-UI (MUI), CSS Modules
- **Real-time**: SignalR Websocket (실시간 민팅 상태 및 타이머 동기화)

---

## 📂 주요 디렉토리 구조 (Directory Structure)

```text
vtok_publishing_web/
├── ApiControllers/       # REST API 컨트롤러 (민팅 관련 API)
├── ClientApp/            # React 프론트엔드 어플리케이션
├── Data/                 # DB Context (ApiDataContext)
├── Hubs/                 # SignalR 허브 (ChatHub / Realtime Hub)
├── Models/               # 백엔드 데이터 모델 (Minting, Whitelist, Time)
├── Repository/           # 데이터 액세스 리포지토리 (Redis, DB)
├── Service/              # 비즈니스 로직 및 백그라운드 타이머 서비스
├── Startup.cs / Program.cs # 애플리케이션 진입점 및 DI 설정
└── README.md
```

- **[ClientApp README 바로가기](./ClientApp/README.md)**: React 클라이언트 상세 구성 요소 안내.

---

## 🚀 실행 가이드 (Execution Guide)

### 1. 백엔드 실행 (.NET Core)
```bash
dotnet restore
dotnet run
```

### 2. 프론트엔드 개발 서버 실행 (ClientApp)
```bash
cd ClientApp
npm install
npm start
```
웹 브라우저에서 `http://localhost:3000` 접속 후 확인 가능합니다.

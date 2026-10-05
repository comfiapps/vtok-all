# 🌐 VTOK Publishing Web (VTOK 메인 퍼블리싱 웹 상세 지침서)

VTOK 플랫폼의 메인 브랜딩 웹사이트, 화이트리스트 사전 등록, 카운트다운 타이머, 3D 하우스 애니메이션 및 실시간 민팅 수량 동기화 서비스를 제공하는 풀스택 웹 프로젝트입니다.

---

## 📐 1. 모듈 전체 아키텍처 및 데이터 흐름 (Architecture Specification)

본 시스템은 **React 17 SPA 프론트엔드**, **ASP.NET Core Web API 백엔드**, **SignalR 웹소켓 허브**, **Redis 실시간 캐시**, **MySQL RDBMS**로 구성된 풀스택 아키텍처를 가집니다.

---

### 1.1 컴포넌트 & 레이어 구조도 (Component Architecture Map)

```mermaid
flowchart TD
    subgraph Frontend ["🖥️ 1. React 프론트엔드 (ClientApp/src)"]
        direction LR
        MINT_UI["📦 UI 컴포넌트\n(MintBox / CountDownTimer / HousePreview)"]
        API_REQ["📡 REST API Client\n(apiRequests.js)"]
        WS_CLIENT["⚡ WebSocket Client\n(HubConnectionBuilder)"]

        MINT_UI --> API_REQ
        MINT_UI <--> WS_CLIENT
    end

    subgraph Backend ["⚙️ 2. ASP.NET Core 백엔드 API (vtok_publishing_web)"]
        direction LR
        CTRL["🎮 MittingController\n(REST API Endpoints)"]
        SVC["🧠 MittingService\n(자격/수량 비즈니스 검증)"]
        HOSTED["🔄 TimedHostedService\n(5초 백그라운드 타이머)"]
        HUB["💬 ChatHub\n(SignalR /chatHub 허브)"]

        CTRL --> SVC
        HOSTED --> HUB
    end

    subgraph Storage ["💾 3. 인프라 & 데이터베이스"]
        direction LR
        REDIS[("⚡ Redis Cache\n- Mitting{round}\n- MintingTime")]
        MYSQL[("🗄️ MySQL Database\n- SitinAddr (사전 대기열)\n- MittingAddr (승인 내역)")]
    end

    API_REQ -->|HTTP REST API| CTRL
    SVC -->|EF Core ApiDataContext| MYSQL
    CTRL -->|카운트 조회| REDIS
    HOSTED -->|5초 주기 조회| REDIS
    HUB -.->|SignalR Realtime Push| WS_CLIENT
```

---

### 1.2 민팅 승인 및 실시간 카운트 브로드캐스트 시퀀스 (Minting & SignalR Sequence)

사용자가 민팅 버튼을 클릭했을 때의 reCAPTCHA 검증부터 Kaikas 지갑 서명, DB 반영, Redis 캐싱 및 SignalR 웹소켓을 통한 전 사용자 실시간 카운터 업데이트까지의 3단계(Phase) 시퀀스입니다.

```mermaid
sequenceDiagram
    autonumber
    actor User as 👤 사용자 브라우저
    participant UI as 📦 MintBox (React)
    participant Captcha as 🛡️ Google reCAPTCHA
    participant Kaikas as 🦊 Kaikas (window.klaytn)
    participant API as 🎮 MittingController
    participant Svc as 🧠 MittingService
    participant DB as 🗄️ MySQL (ApiDataContext)
    participant Redis as ⚡ Redis (RedisRepository)
    participant Hosted as 🔄 TimedHostedService
    participant Hub as 💬 ChatHub (SignalR)
    participant OtherUsers as 👥 전체 접속 사용자

    User->>UI: 1. "민팅하기" 버튼 클릭
    UI->>Captcha: 2. executeAsync() 봇 검증 토큰 획득
    Captcha-->>UI: 3. captchaToken 반환

    rect rgb(240, 248, 255)
        note over UI,DB: [Phase 1] 자격 및 잔여 수량 정밀 검증 (Sitin)
        UI->>API: 4. POST /api/sitin/{account}?token={captchaToken}
        API->>Svc: 5. Sitin(sitinDto)
        Svc->>Redis: 6. CheckTime() & GetKey("Mitting" + round)
        Svc->>DB: 7. 화이트리스트 & 이전 수량 확인 후 SitinAddr Insert
        Svc-->>API: 8. transactionModel (to: "0xc095...136", gas: "21000")
        API-->>UI: 9. HTTP 200 OK
    end

    rect rgb(255, 250, 240)
        note over UI,Kaikas: [Phase 2] 온체인 트랜잭션 서명 및 전송
        UI->>Kaikas: 10. klay_sendTransaction (to, value: 0.0001 KLAY, gas)
        Kaikas->>User: 11. 서명 팝업 승인 요청
        User-->>Kaikas: 12. 서명 승인
        Kaikas-->>UI: 13. 온체인 트랜잭션 해시(Tx_id) 반환
    end

    rect rgb(245, 255, 245)
        note over UI,OtherUsers: [Phase 3] 승인 영속화 및 실시간 브로드캐스트 (Approval)
        UI->>API: 14. POST /api/approval/{account} (Tx_id, Count, Round)
        API->>Svc: 15. Approval(mittingDto)
        Svc->>DB: 16. MittingAddr 승인 내역 Insert & CheckCount(round) 합산
        Svc->>Redis: 17. SetKey("Mitting" + round, cnt) 최신화
        API->>Hub: 18. Clients.All.SendAsync("Receive", "Count", cnt)
        Hub-->>OtherUsers: 19. WebSocket 실시간 Count 푸시
        Hub-->>UI: 20. WebSocket 실시간 Count 푸시 & UI 갱신 완료
        API-->>UI: 21. HTTP 200 OK 최종 응답
    end

    par 백그라운드 5초 타이머 브로드캐스트
        Hosted->>Redis: 22. 5초마다 GetMintingTime() & GetTime() 조회
        Hosted->>Hub: 23. SendAsync("Receive", "Time"/"Web", data) 트리거
        Hub-->>OtherUsers: 24. 상태 동기화 웹소켓 푸시
    end
```

---

### 1.3 백그라운드 서비스 동작 및 예외 처리 흐름 (Hosted Service Lifecycle)

```mermaid
flowchart TD
    START([🚀 TimedHostedService 시작]) --> LOOP[⏳ 5초 간격 DoWork 실행]
    LOOP --> REDIS_QUERY[⚡ Redis GetMintingTime 조회]
    
    REDIS_QUERY --> COND{현재 민팅 상태}
    COND -->|Start 상태| START_BRANCH[Mitting1 카운터 및 남은 시간 수신]
    COND -->|End 상태| END_BRANCH[전체 웹 클라이언트에 End 전송 후 Timer 종료]
    COND -->|기타 상태| IDLE_BRANCH[현재 라운드 상태 브로드캐스트]

    START_BRANCH --> BROADCAST[💬 ChatHub SendAsync]
    IDLE_BRANCH --> BROADCAST
    BROADCAST --> LOOP
    END_BRANCH --> STOP([🛑 Hosted Service Dispose])
```

---

## 🏗️ 2. 모듈별 파일 단위 상세 명세 (File-by-File Technical Spec)

### 2.1 `ApiControllers/MittingController.cs` (REST API 컨트롤러)
- **`GET /api/time`**: 현재 민팅 라운드 및 남은 시각 조회. `_services.GetTime()`을 호출하여 라운드가 1 미만이면 `"result"` 반환, 그 외 `Time` 객체 반환.
- **`GET /api/mitting`**: `_services.GetMintingTime()` 호출하여 전체 라운드 타임 테이블 및 현재 상태 문자열(`"Start"`, `"End"` 등) 반환.
- **`GET /api/result`**: `_services.GetResult()` 호출하여 민팅 최종 결과 반환.
- **`GET /api/addr/{id}`**: `_services.CheckAddr(id)` 호출하여 특정 지갑 주소(`id`)의 민팅 허용 수량, 이미 진행된 민팅 수량 및 예외 메시지 반환.
- **`GET /api/count/{round}`**: 특정 라운드의 민팅된 총 수량을 반환하고, SignalR 허브를 통해 `Receive("Count", cnt)`로 실시간 카운트 브로드캐스트.
- **`POST /api/sitin/{id}`**: 사전 대기열 등록. Body: `SitinDto` (`{ string Addr, int Count }`).
- **`POST /api/approval/{id}`**: 최종 민팅 트랜잭션 수락 및 수량 차감. Body: `MittingDto` (`{ string Addr, string Tx_id, string Value, int Count, int Round }`). 차감 후 SignalR `Receive("Count", cnt)` 브로드캐스트.

---

### 2.2 `Service/MittingService.cs` (비즈니스 서비스 및 예외 검증 로직)
민팅 요청 시 다음 예외 유형(`transactionModel.Msg` / `MittingAddr.Msg`)에 대한 정밀 검증을 수행합니다:
- **`type: 6`**: `"민팅 시간이 아닙니다."` (`time == null`)
- **`type: 1`**: `"민팅 수량이 모두 소진되었습니다."` (`cnt >= time.Count`)
- **`type: 3`**: `"화이트리스트 대상자가 아닙니다."` (`time.Group == "prive"`일 때 DB 화이트리스트에 조회되지 않는 경우)
- **`type: 4`**: `"내게 남은 수량보다 더 많이 민팅할 수 없습니다."` (`(time.Approvalcount - Resultcount) - sitinDto.Count < 1`)

---

### 2.3 `Service/TimedHostedService.cs` (백그라운드 타이머 호스 티드 서비스)
- `IHostedService`를 상속받아 5초 간격(`TimeSpan.FromSeconds(5)`)으로 `DoWork` 루프를 실행.
- `_redis.GetMintingTime()` 결과에 따라 SignalR 이벤트 처리:
  - `"End"`: `_hubContext.Clients.All.SendAsync("Receive", "Web", "End")` 전송 후 백그라운드 타이머 종료 (`Dispose`).
  - `"Start"`: `_redis.GetTime()` 조회 후 `Receive("Time", response)` 또는 `Receive("Api", "result")` 전송.
  - 기타: `_hubContext.Clients.All.SendAsync("Receive", "Web", mitting)` 전송.

---

### 2.4 `Repository/RedisRepository.cs` (Redis 키 구조)
- `"Mitting" + round` (예: `Mitting1`, `Mitting2`): 해당 라운드에 민팅 완료된 수량 저장.
- `"MintingTime"`: 현재 시스템 민팅 진행 상태 정보 (`Start`, `End`, 대기 상태 등).

---

### 2.5 `Data/ApiDataContext.cs` (EF Core 데이터베이스 컨텍스트)
- **`SitinEntity`** (`SitinAddr` 테이블 매핑): `Id` (PK), `Addr`, `Count`, `Date`
- **`MittingEntity`** (`MittingAddr` 테이블 매핑): `Id` (PK), `Addr`, `Tx_id`, `Value`, `Count`, `Round`, `Date`

---

## 📱 3. ClientApp (React Frontend) 소스 구성

ClientApp 내부의 세부 컴포넌트 사양은 **[ClientApp/README.md](./ClientApp/README.md)** 문서를 확인하시기 바랍니다.

# 📱 VTOK Publishing Web ClientApp (React Frontend 세부 아키텍처 지침서)

VTOK 플랫폼의 메인 브랜딩 웹사이트, Web3 지갑(Kaikas) 연동, reCAPTCHA 봇 방지, 실시간 카운트다운 타이머 및 SignalR 실시간 수량 동기화를 담당하는 React 17 SPA 프론트엔드 어플리케이션의 세부 아키텍처 및 소스 명세서입니다.

---

## 📐 1. ClientApp 프론트엔드 전체 아키텍처 맵 (Frontend Architecture)

본 프론트엔드 어플리케이션은 **프레젠테이션 레이아웃 계층**, **민팅 & 타이머 서브시스템**, **Web3 & 봇 검증 계층**, **REST API & SignalR 웹소켓 실시간 통신 계층**의 4개 레이어로 체계화되어 있습니다.

```mermaid
flowchart TD
    subgraph PresentationTier ["🎨 1. 프레젠테이션 & 레이아웃 계층 (Presentation Layer)"]
        direction TB
        APP["App.js\n- Root account 상태 보유\n- Global Theme & Router 주입"]
        MAIN["layouts/Main/index.js\n- Scroller 스크롤 섹션 트래커\n- MainAppBar (지갑 연결 / 네비게이션)\n- MainFooter (공식 링크 & 저작권)"]
        
        subgraph SectionLayouts ["스크롤 반응형 섹션 레이아웃"]
            HOME["Main/Home.js\n(Hero, MintBox 컨테이너, 반응형 스케일러)"]
            NFT["NFT/index.js\n(아트워크 갤러리 그리드)"]
            SERVICE["Service/index.js\n(Pet, Story, Feature 탭 전환)"]
            ROADMAP["Roadmap/index.js\n(로드맵 마일스톤)"]
            TEAM["Team/index.js\n(14인 팀 프로필)"]
            PARTNER["Partner/index.js\n(파트너사 로고)"]
        end
        APP --> MAIN
        MAIN --> SectionLayouts
    end

    subgraph MintSubsystem ["📦 2. 민팅 & 비주얼 서브시스템 (Minting Subsystem)"]
        direction TB
        MINTBOX["components/MintBox/index.js\n- 지갑 연결 상태 및 주소 요약 렌더링\n- KLAY 잔액 (PEB -> KLAY 환산)\n- 민팅 현황 게이지 (collected / total)\n- 남은 시간 타일 (D / H / M / S)\n- 1인당 할당량 (minted / myTotal)"]
        TIMER["components/CountDownTimer/index.js\n(1초 인터벌 카운트다운 연산)"]
        HOUSE["components/HousePreview/index.js\n(반응형 3D 아바타 & 펫 애니메이션)"]
        MINTBOX --- TIMER
        HOME --- HOUSE
    end

    subgraph Web3SecurityTier ["🛡️ 3. Web3 지갑 & 보안 검증 계층 (Web3 & Security)"]
        direction TB
        WALLET["Kaikas 지갑 (window.klaytn)\n- klay_getBalance (잔액 실시간 조회)\n- klay_sendTransaction (온체인 트랜잭션 서명)"]
        CAPTCHA["Google reCAPTCHA v2/v3 (react-google-recaptcha)\n- Invisible reCAPTCHA 토큰 비동기 획득\n- 봇/매크로 민팅 방지"]
    end

    subgraph CommunicationTier ["📡 4. 통신 & 실시간 동기화 계층 (Network & Realtime)"]
        direction TB
        REST_API["api/apiRequests.js & api/request.js\n- getMintingData() -> GET /api/time\n- getMintingStatus() -> GET /api/mitting\n- mintAPI() -> POST /api/sitin/{account}\n- approvalAPI() -> POST /api/approval/{account}"]
        SIGNALR_CLIENT["SignalR WebSocket (@microsoft/signalr)\n- HubConnectionBuilder.withUrl('/chatHub')\n- 'Receive' (Count, Time, Web) 실시간 수신"]
    end

    subgraph BackendStorage ["⚙️ 백엔드 호스트 (vtok_publishing_web)"]
        ASP_BACKEND["ASP.NET Core 6 Web API & ChatHub\n(Redis 캐시 & MySQL RDBMS 연동)"]
    end

    %% 연결 관계
    HOME --> MINTBOX
    MINTBOX --> CAPTCHA
    MINTBOX <--> WALLET
    MINTBOX --> REST_API
    MINTBOX <--> SIGNALR_CLIENT
    REST_API -->|HTTP REST| ASP_BACKEND
    SIGNALR_CLIENT <-->|실시간 양방향 웹소켓| ASP_BACKEND
```

---

## 🔄 2. ClientApp 내부 상태 & 인터랙션 라이프사이클 (State & Lifecycle)

사용자 접속부터 지갑 연결, 민팅 진행, 실시간 동기화까지 프론트엔드 내부의 상태 변화 흐름입니다.

```mermaid
flowchart TD
    START([🌐 웹사이트 접속]) --> INIT_STATUS[getMintingStatus 호출\nGET /api/mitting]
    INIT_STATUS --> STATUS_SWITCH{민팅 상태 판별}
    
    STATUS_SWITCH -->|'Start'| MODE_ACTIVE[mode = 0 : 민팅 활성화]
    STATUS_SWITCH -->|'Wait'| MODE_WAIT[mode = 1 : 오픈 카운트다운 모드]
    STATUS_SWITCH -->|'End' 또는 기타| MODE_CLOSE[mode = -1 : 민팅 마감 안내]

    MODE_ACTIVE --> CONNECT_REQ{Kaikas 지갑 연결 여부}
    CONNECT_REQ -->|미연결| SHOW_CONNECT_BTN[지갑 연결 안내 버튼 표시]
    CONNECT_REQ -->|연결 완료| FETCH_BALANCE[klay_getBalance 잔액 조회\nPEB / 10^18 -> KLAY 변환]

    FETCH_BALANCE --> INIT_WS[SignalR /chatHub 웹소켓 연결 수립]
    INIT_WS --> LISTEN_WS[웹소켓 이벤트 구독\n- Count 수신 시: 잔여 수량 UI 즉시 갱신\n- Time 수신 시: 타이머 동기화\n- Web 수신 시: 모드 전환]

    LISTEN_WS --> CLICK_MINT[👤 '민팅하기' 버튼 클릭]
    CLICK_MINT --> EXEC_CAPTCHA[reCAPTCHA executeAsync 실행 ➔ 토큰 발급]
    EXEC_CAPTCHA --> CALL_SITIN[mintAPI 호출 ➔ POST /api/sitin\n서버 측 자격/화이트리스트 검증]
    
    CALL_SITIN --> CHECK_SITIN{서버 검증 성공?}
    CHECK_SITIN -->|실패 또는 한도초과| SHOW_ERR[에러 알림 출력 및 버튼 복구]
    CHECK_SITIN -->|성공 To 및 Gas 획득| SEND_TX[klay_sendTransaction 요청\nKaikas 지갑 트랜잭션 서명 팝업]

    SEND_TX --> USER_APPROVE{사용자 승인?}
    USER_APPROVE -->|거부| CANCEL_MINT[민팅 취소]
    USER_APPROVE -->|승인 Tx_id 획득| CALL_APPROVE[approvalAPI 호출\nPOST /api/approval\nAddr, Tx_id, Count, Round]

    CALL_APPROVE --> DONE([🎉 민팅 완료 & UI 최신화])
```

---

## ⚡ 3. Web3 & SignalR 통신 시퀀스 (Frontend Interaction Sequence)

```mermaid
sequenceDiagram
    autonumber
    actor User as 👤 사용자
    participant UI as 📱 MintBox (React)
    participant Recaptcha as 🛡️ reCAPTCHA
    participant Kaikas as 🦊 Kaikas (window.klaytn)
    participant ApiClient as 📡 apiRequests.js
    participant Server as ⚙️ ASP.NET Core API (/api)
    participant Hub as 💬 SignalR Hub (/chatHub)

    Note over UI,Hub: 1. 초기화 및 실시간 스트림 연결
    UI->>Hub: new HubConnectionBuilder().withUrl("/chatHub").build()
    Hub-->>UI: WebSocket 연결 완료
    Hub->>UI: on("Receive", "Count", cnt) ➔ 실시간 수량 갱신

    Note over User,Server: 2. 3-Phase 민팅 트랜잭션 수행
    User->>UI: 민팅 버튼 클릭
    UI->>Recaptcha: executeAsync()
    Recaptcha-->>UI: captchaToken
    UI->>ApiClient: mintAPI(account, captchaToken)
    ApiClient->>Server: POST /api/sitin/{account}?token={captchaToken}
    Server-->>ApiClient: { to: "0xc095...136", gas: "21000" }
    ApiClient-->>UI: 검증 승인 데이터 전달

    UI->>Kaikas: klay_sendTransaction({ to, value: 0.0001 KLAY, gas: 21000 })
    Kaikas->>User: 서명 팝업 확인 요청
    User-->>Kaikas: 서명 확인
    Kaikas-->>UI: 온체인 Tx_id 반환

    UI->>ApiClient: approvalAPI(account, { Addr, Tx_id, Count, Round })
    ApiClient->>Server: POST /api/approval/{account}
    Server-->>ApiClient: 200 OK (승인 완료)
    Server->>Hub: Clients.All.SendAsync("Receive", "Count", newCount)
    Hub-->>UI: 실시간 카운터 푸시 수신 ➔ 잔여 수량 재계산
    UI-->>User: 민팅 완료 피드백 표시
```

---

## 📂 4. 파일별 기능 및 인터페이스 세부 명세 (File & Component Breakdown)

### 4.1 API & SignalR 연동 Layer (`src/api/`)
- **`src/api/request.js`**:
  - Axios 인스턴스 생성: `baseURL: ''`, `timeout: 10000`.
  - 응답 인터셉터를 통한 HTTP 401/403/500 에러 처리 및 표준 Promise 반환.
- **`src/api/apiRequests.js`**:
  - **`getMintingData(onSuccess, onError)`**: `GET /api/time` 호출 ➔ 현재 활성화된 라운드 정보 및 남은 시각(`Time` 모델) 수신.
  - **`getMintingStatus(onSuccess, onError)`**: `GET /api/mitting` 호출 ➔ 현재 시스템 민팅 상태(`"Wait"`, `"Start"`, `"End"`) 수신.
  - **`mintAPI(account, recaptchaToken, onSuccess, onError)`**: `POST /api/sitin/${account}?token=${recaptchaToken}` 호출 ➔ 봇 방지 검증, 화이트리스트 검사 및 송금 주소(`to`) 획득.
  - **`approvalAPI(account, body, onSuccess, onError)`**: `POST /api/approval/${account}` 호출 ➔ 온체인 트랜잭션 해시(`Tx_id`), 수량, 라운드 전달 및 승인 확정.

---

### 4.2 UI 컴포넌트 Layer (`src/components/`)

#### 📦 `MintBox/index.js`
- **역할**: Web3 지갑 연동, reCAPTCHA 봇 방지, 잔액 표시, 카운트다운 타이머 렌더링, SignalR 실시간 수량 반영을 총괄하는 핵심 컴포넌트.
- **Kaikas 지갑 연동**:
  ```js
  const getUserBalance = async (address) => {
      await klaytn.sendAsync({method: 'klay_getBalance', params: [address, 'latest']},
          (err, result) => setBalance(result.result / Math.pow(10, 18)));
  }
  ```
- **3-Phase 민팅 핸들러 (`handleMinting`)**:
  1. `recaptchaRef.current.executeAsync()`로 봇 방지 토큰 발급
  2. `mintAPI` 호출하여 서버 사전 검증 수행
  3. `klaytn.sendAsync({ method: 'klay_sendTransaction', params: [transactionParameters] })`로 트랜잭션 서명
  4. `approval(result)`에서 `approvalAPI`를 호출하여 서버 DB 영속화 요청

#### ⏱️ `CountDownTimer/index.js`
- **역할**: 라운드 시작/종료 시각까지 남은 시간을 1초 간격으로 계산 및 시/분/초 2자리 패딩 표시.
- **Props**: `targetTime` (Unix Timestamp MS)

#### 🏠 `HousePreview/index.js`
- **역할**: VTOK 메타버스 하우스, 아바타, 펫 3종의 애니메이션 WebP/GIF 렌더링.
- **반응형 뷰포트 연동**: [`Home.js`](./src/layouts/Main/Home.js)의 윈도우 폭 변경 이벤트에 따라 동적 스케일링(`scale`) 적용.

#### 🧭 `MainAppBar/index.js` & `MainDrawer/index.js`
- **역할**: 상단 헤더 네비게이션 바 및 모바일용 반응형 드로어. 지갑 연결 버튼 및 현재 연결된 지갑 주소 단축 표시(`0x...`).

---

### 4.3 페이지 레이아웃 Layer (`src/layouts/`)
- **`Main/index.js`**: `Scroller`를 활용하여 원페이지 스크롤 뷰 구성 및 섹션 포커스 트래킹.
- **`Main/Home.js`**: 히어로 배너, 브랜드 아이덴티티, 3D 하우스 그래픽 및 민팅 상태(`getMintingStatus`)에 따른 `MintBox` 조건부 렌더링.
- **`NFT/index.js`**: VTOK NFT 아트워크 수집품 그리드 카드 레이아웃.
- **`Service/`**: `ServiceTabs.js`, `Pet.js`, `Story.js`, `AbsoluteBox.js`를 통한 메타버스 세계관 소개.
- **`Roadmap/index.js`**: 분기별 프로젝트 추진 로드맵 카드.
- **`Team/index.js`**: 14인의 핵심 팀원 프로필 카드 레이아웃.
- **`Partner/index.js`**: 협력 파트너사 로고 그리드.

---

### 4.4 리소스 & 반응형 유틸리티 Layer (`src/res/`)
- **`theme.js`**: MUI v5 커스텀 테마 (`primary: #007FFF`, 타이포그래피, 브레이크포인트).
- **`windowSize.js`**: 브라우저 창 크기 실시간 감지 훅 (`useWindowDimensions`).
- **`scroller.js`**: 휠 및 터치 제스처를 감지하여 부드러운 섹션 전환을 제공하는 스크롤 엔진.

---

## 🔬 5. 심층 분석 구현 파라미터 및 상수 명세 (Implementation Constants & Specs)

소스 코드 정밀 분석을 통해 도출된 핵심 파라미터 및 비즈니스 연산 공식입니다:

* **Klaytn PEB ➔ KLAY 잔액 환산 공식**:
  $$\text{balance (KLAY)} = \frac{\text{result.result (PEB)}}{10^{18}}$$
* **온체인 가스비 & 결제 파라미터 (`transactionParameters`)**:
  - `gas`: `21000` (고정 가스 리밋)
  - `value`: `100000000000000` peb ($10^{14}$ peb = 0.0001 KLAY)
  - `to`: `response.to` (백엔드 `transactionModel`에서 반환하는 수납 주소 `0xc095f858dd6a0d87cb9755e11caba1ec6305a136`)
* **Google reCAPTCHA v2/v3 Invisible**:
  - `sitekey`: `6LfT1H8eAAAAAMydoaaYRj53J7-BiN3eCF8MBtm1`
  - `size`: `invisible`
* **3D 하우스 뷰포트 반응형 스케일 공식 (`Home.js`)**:
  $$\text{cal} = \left(\frac{\text{divWidth} \times 0.7}{664}\right) - 0.2$$
  - `houseOriginWidth`: `664px`
  - `minScale`: `0.7`
  - 모바일 브레이크포인트 도달 시: $\text{scale} = \frac{\text{width} - 30}{664}$

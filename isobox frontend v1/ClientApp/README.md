# 🖥️ iSOBOX Frontend v1 ClientApp (1세대 모놀리식 프론트엔드 아키텍처 명세서)

iSOBOX 메타버스 프로젝트의 1세대 오리지널 SPA(Single Page Application) 클라이언트 소스 디렉토리입니다.  
React 17 및 Material-UI(MUI v5)를 기반으로 구축되었으며, 단일 페이지 스크롤 레이아웃 위에 Kaikas 지갑 연동, 3-Phase 온체인 민팅, reCAPTCHA 봇 방지, 3D 하우스/펫 반응형 뷰어를 통합한 초기 아키텍처 명세서입니다.

---

## 📐 1. ClientApp 프론트엔드 전체 아키텍처 맵 (Frontend Architecture)

```mermaid
flowchart TD
    subgraph PresentationTier ["🎨 1. 프레젠테이션 & 레이아웃 계층 (Presentation Layer)"]
        direction TB
        APP["App.js\n- Global account 상태 보유\n- Global Theme 주입"]
        MAIN["layouts/Main/index.js\n- Scroller 섹션 인덱스 추적\n- MainAppBar (헤더 네비게이션 & 지갑 연동)\n- MainFooter (공식 링크 & 저작권)"]
        
        subgraph SectionLayouts ["1세대 개별 섹션 레이아웃 (layouts/)"]
            HOME["Main/Home.js\n(Hero, MintBox 컨테이너, 3D 하우스 스케일러)"]
            NFT["NFT/index.js\n(아바타, 아이템, 외부 연동 3분할 갤러리)"]
            SERVICE["Service/index.js\n- AbsoluteBox.js (배경 블러 데코)\n- Pet.js (3D 펫 인터랙션)\n- ServiceTabs.js (4대 서비스 탭)\n- Story.js (세계관 스토리)"]
            ROADMAP["Roadmap/index.js\n(분기별 마일스톤 카드)"]
            TEAM["Team/index.js\n(14인 팀원 프로필 카드 그리드)"]
            PARTNER["Partner/index.js\n(파트너사 로고 그리드)"]
        end
        APP --> MAIN
        MAIN --> SectionLayouts
    end

    subgraph MintSubsystem ["📦 2. 민팅 & 비주얼 서브시스템 (Minting Subsystem)"]
        direction TB
        MINTBOX["components/MintBox/index.js\n- 지갑 연결 상태 및 단축 주소 렌더링\n- KLAY 잔액 (PEB -> KLAY 환산)\n- 민팅 현황 게이지 (collected / total)\n- 남은 시간 카운터 타일 (D / H / M / S)\n- 1인당 할당량 (minted / myTotal)"]
        TIMER["components/CountDownTimer/index.js\n(서버 시간 기반 1초 인터벌 카운트다운)"]
        HOUSE["components/HousePreview/index.js\n(반응형 3D 아바타 & 펫 애니메이션)"]
        MINTBOX --- TIMER
        HOME --- HOUSE
    end

    subgraph Web3SecurityTier ["🛡️ 3. Web3 지갑 & 보안 검증 계층 (Web3 & Security)"]
        direction TB
        WALLET["Kaikas 지갑 (window.klaytn)\n- klay_getBalance (PEB 잔액 조회)\n- klay_sendTransaction (온체인 트랜잭션 서명)"]
        CAPTCHA["Google reCAPTCHA v2/v3\n(SiteKey: 6LfT1H8eAAAAAMydoaaYRj53J7-BiN3eCF8MBtm1)"]
    end

    subgraph CommunicationTier ["📡 4. 통신 & 백엔드 계층 (Network & Backend)"]
        direction TB
        REST_API["api/apiRequests.js & api/request.js\n- getMintingData() -> GET /api/time\n- getMintingStatus() -> GET /api/mitting\n- mintAPI() -> POST /api/sitin/{account}\n- approvalAPI() -> POST /api/approval/{account}"]
    end

    %% 연결 관계
    HOME --> MINTBOX
    MINTBOX --> CAPTCHA
    MINTBOX <--> WALLET
    MINTBOX --> REST_API
```

---

## 📂 2. 디렉토리 구조 및 핵심 모듈 명세

```
isobox frontend v1/ClientApp/
├── public/                     # 정적 웹 자원 및 HTML 템플릿
└── src/
    ├── api/                    # REST API 통신 클라이언트 (Axios)
    ├── assets/                 # 1세대 3D 하우스, 펫 WebP/GIF 애니메이션, 팀원 사진
    ├── components/             # 핵심 UI 컴포넌트
    │   ├── ContactSection/     # 제휴 문의 패널
    │   ├── CountDownTimer/     # 오픈 카운트다운 타이머
    │   ├── HousePreview/       # 반응형 3D 하우스 & 아바타 프리뷰
    │   ├── MainAppBar/         # 헤더 네비게이션 & 지갑 연동 바
    │   ├── MainDrawer/         # 모바일 햄버거 드로어
    │   ├── MainFooter/         # 푸터 저작권 및 링크
    │   └── MintBox/            # Web3 트랜잭션 민팅 카드
    ├── icons/                  # Arrow, Hamburger, Logo SVG 아이콘
    ├── layouts/                # 1세대 모놀리식 페이지 레이아웃
    │   ├── Main/               # 메인 원페이지 쉘 (index.js, Home.js)
    │   ├── NFT/                # NFT 컬렉션 쇼케이스
    │   ├── Partner/            # 파트너사 로고
    │   ├── Roadmap/            # 로드맵 타임라인
    │   ├── Service/            # 서비스 종합 섹션 (Pet, ServiceTabs, Story)
    │   └── Team/               # 14인 팀 프로필 그리드
    ├── res/                    # 리소스, 테마 및 유틸리티
    │   ├── scroller.js         # 스크롤 앵커 추적 엔진
    │   ├── strings.js          # 기본 문자열 딕셔너리
    │   ├── theme.js            # MUI 테마 정의
    │   ├── values.js           # 섹션 및 콘텐츠 데이터 매니페스트
    │   └── windowSize.js       # 윈도우 크기 감지 훅
    ├── App.js                  # 메인 앱 진입점
    └── index.js                # React DOM 렌더링 엔트리포인트
```

---

## ⚡ 3. 3-Phase 민팅 트랜잭션 흐름도

```mermaid
sequenceDiagram
    autonumber
    actor User as 👤 사용자
    participant UI as 📱 MintBox (React)
    participant Recaptcha as 🛡️ reCAPTCHA
    participant Kaikas as 🦊 Kaikas (window.klaytn)
    participant ApiClient as 📡 apiRequests.js
    participant Server as ⚙️ ASP.NET Core API (/api)

    User->>UI: 민팅 버튼 클릭
    UI->>Recaptcha: executeAsync()
    Recaptcha-->>UI: captchaToken 발급
    UI->>ApiClient: mintAPI(account, captchaToken)
    ApiClient->>Server: POST /api/sitin/{account}?token={captchaToken}
    Server-->>ApiClient: { to: "0xc095...", gas: "21000" } (사전 검증 성공)
    ApiClient-->>UI: 트랜잭션 파라미터 전달

    UI->>Kaikas: klay_sendTransaction({ to, value: 0.0001 KLAY, gas: 21000 })
    Kaikas->>User: 서명 팝업 확인 요청
    User-->>Kaikas: 트랜잭션 서명 승인
    Kaikas-->>UI: 온체인 Tx_id 반환

    UI->>ApiClient: approvalAPI(account, { Addr, Tx_id, Count, Round })
    ApiClient->>Server: POST /api/approval/{account}
    Server-->>ApiClient: 200 OK (승인 및 영속화 완료)
    UI-->>User: 🎉 민팅 성공 안내
```

---

## 🚀 4. 빌드 및 로컬 실행 가이드

```bash
# 1. 의존성 패키지 설치
npm install --legacy-peer-deps

# 2. 로컬 개발 서버 기동
npm start

# 3. 상용 프로덕션 빌드 생성
npm run build
```
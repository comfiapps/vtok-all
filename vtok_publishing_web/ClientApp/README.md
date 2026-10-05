# 📱 VTOK Publishing Web ClientApp (React Frontend 세부 명세서)

`vtok_publishing_web` 백엔드 서비스와 연결된 React SPA 프론트엔드 어플리케이션의 세부 소스 파일 및 컴포넌트 명세서입니다.

---

## 📂 파일별 기능 및 인터페이스 세부 명세 (File & Component Breakdown)

### 1. API & SignalR 연동 Layer (`src/api/`)
- **`src/api/request.js`**:
  - Axios 인스턴스 생성: `baseURL: ''`, `timeout: 10000`.
  - HTTP 401/403/500 응답 인터셉터 및 에러 로깅.
- **`src/api/apiRequests.js`**:
  - `getTime()`: `GET /api/time` 호출 ➔ 민팅 라운드 및 남은 시각 수신.
  - `getMintingCount(round)`: `GET /api/count/${round}` ➔ 해당 라운드의 실시간 카운트 조회.
  - `postApproval(id, dto)`: `POST /api/approval/${id}` ➔ 민팅 수락 및 트랜잭션 해시 전달.
  - `postSitin(id, dto)`: `POST /api/sitin/${id}` ➔ 대기열 사전 신청.

---

### 2. UI 컴포넌트 Layer (`src/components/`)

#### ⏱️ `CountDownTimer/index.js`
- **역할**: 백엔드 라운드 시각까지 남은 카운트다운을 1초 간격으로 계산 및 표시.
- **Props**: `targetTime` (Unix Timestamp MS)
- **내부 상태**: `days`, `hours`, `minutes`, `seconds`
- **구현 알고리즘**: `Math.floor((difference / 1000) % 60)` 등으로 시/분/초 분할 후 2자리 패딩.

#### 📦 `MintBox/index.js`
- **역할**: SignalR 웹소켓과의 실시간 연동 및 민팅 진행률 Bar 렌더링.
- **SignalR 웹소켓 연동**:
  ```js
  const connection = new HubConnectionBuilder().withUrl("/chatHub").build();
  connection.on("Receive", (type, data) => {
      if (type === "Count") setMintedCount(data);
  });
  ```
- **렌더링**: 남은 민팅 수량(`total - mintedCount`), 민팅 신청 버튼 클릭 시 지갑 주소 유효성 검사 후 `postApproval` 호출.

#### 🏠 `HousePreview/index.js`
- **역할**: VTOK 캐릭터 및 펫 그래픽 자원 프리뷰.
- **사용 자원**: `assets/web.image_anim.house.avatar.gif`, `assets/web.image_anim_pet1.webp`, `assets/web.image_anim_pet2.webp`

#### ✉️ `ContactSection/index.js`
- **역할**: 공식 커뮤니티 링크 제공 (Discord, Twitter, Telegram, Medium).

---

### 3. 페이지 레이아웃 Layer (`src/layouts/`)
- **`Main/Home.js`**: 히어로 배너, 브랜드 아이덴티티 문구 및 메인 CTA 버튼.
- **`NFT/index.js`**: VTOK NFT 아트워크 수집품 그리드 카드 레이아웃.
- **`Roadmap/index.js`**: 프로젝트 Q1 ~ Q4 단계별 추진 계획 카드.
- **`Service/`**:
  - `ServiceTabs.js`: 탭 메뉴 전환 (`Pet`, `Story`, `Feature`).
  - `Pet.js`: Animated WebP 기반 펫 캐릭터 인터랙션 설명.
  - `Story.js`: VTOK 메타버스 세계관 스토리텔링 텍스트.
- **`Team/index.js`**: 14명의 팀원 프로필 카드(`team_member_01_david.png` ~ `14_wilson.png`).

---

### 4. 자원 및 테마 Layer (`src/res/`)
- **`strings.js`**: 다국어/공통 텍스트 정의.
- **`theme.js`**: Material-UI `createTheme` 기반의 커스텀 컬러 팔레트 (`primary`, `secondary`, `background`).
- **`windowSize.js`**: `window.innerWidth` 기반 반응형 뷰포트 크기 변경 감지 훅.

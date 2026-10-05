# 📱 VTOK Publishing Web ClientApp (React Frontend 명세서)

`vtok_publishing_web` 백엔드와 연동되는 React Single Page Application(SPA) 클라이언트 프로젝트입니다.

---

## 📄 파일 및 컴포넌트 단위 명세 (File-by-File Component Spec)

### 1. `src/api/` (API 호출 Layer)
- **`request.js`**: Axios 인스턴스 (`baseURL`, `timeout: 10000`, `Content-Type: application/json`).
- **`apiRequests.js`**:
  - `getTime()`: `GET /api/time`
  - `getMintingCount(round)`: `GET /api/count/${round}`
  - `postApproval(id, dto)`: `POST /api/approval/${id}`
  - `postSitin(id, dto)`: `POST /api/sitin/${id}`

### 2. `src/components/` (주요 UI 컴포넌트)
- **`CountDownTimer/index.js`**:
  - `props`: `targetTime` (밀리초)
  - `state`: `days`, `hours`, `minutes`, `seconds`
  - 1초 간격 인터벌로 민팅 시작 시각까지의 남은 시간 동적 계산 및 UI 렌더링.
- **`MintBox/index.js`**:
  - `props`: `round`, `totalCount`, `currentCount`
  - SignalR Hub(`/chatHub`)와 연결하여 서버에서 발송하는 `Receive("Count", cnt)` 이벤트를 리스닝하고 ProgressBar 및 남은 수량을 실시간 갱신.
- **`HousePreview/index.js`**:
  - Isometric 캐릭터 및 펫 그래픽 애니메이션 WebP/GIF 렌더링.
- **`ContactSection/index.js`**:
  - 디스코드, 트위터, 미디엄, 텔레그램 공식 소셜 채널 아웃링크 버튼.
- **`MainAppBar/index.js` & `MainDrawer/index.js`**:
  - 메인 상단 내비게이션 및 모바일 대응 드로어 메뉴.

### 3. `src/layouts/` (페이지 섹션 레이아웃)
- **`Main/Home.js`**: 히어로 섹션, 메인 타이트 캐치프레이즈 및 민팅 참여 CTA 버튼.
- **`NFT/index.js`**: VTOK NFT 아트워크 프리뷰 갤러리 카드 뷰.
- **`Roadmap/index.js`**: Phase 1 ~ Phase 4 타임라인 카드 UI.
- **`Service/`**:
  - `ServiceTabs.js`: Story, Pet, Feature 탭 전환 제어.
  - `Pet.js`, `Story.js`: 서비스 상세 설명 및 GIF 그래픽 자원 바인딩.
- **`Team/index.js`**: 팀원 14명의 프로필 카드(`team_member_01~14.png`) 및 역할 렌더링.

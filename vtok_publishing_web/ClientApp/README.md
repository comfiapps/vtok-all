# 📱 VTOK Publishing Web ClientApp (React Frontend)

`vtok_publishing_web` 프로젝트의 React SPA 클라이언트 어플리케이션입니다.  
VTOK 화이트리스트 신청, 카운트다운 타이머, 3D 캐릭터 하우스 프리뷰, 민팅 박스 및 서비스 로드맵 등 메인 사용자 웹 화면을 담당합니다.

---

## 🛠️ 프론트엔드 기술 구성

- **Core**: React 17+, React DOM, React Router DOM
- **UI Framework**: Material-UI (MUI v5), Emotion styled-components
- **Real-time & Network**: Axios, `@microsoft/signalr` (SignalR Client)
- **Asset Formats**: WebP, Animated WebP, GIF, SVG, PNG (high-resolution character assets)

---

## 📂 상세 컴포넌트 & 레이어 구조

```text
src/
├── api/
│   ├── apiRequests.js      # REST API 호출 함수 모듈 (/api/time, /api/count, /api/approval 등)
│   └── request.js          # Axios 인스턴스 및 인터셉터
├── assets/                 # 캐릭터, 펫, 배경 애니메이션 WebP/GIF/PNG 및 SVG 아이콘 파일
├── components/
│   ├── ContactSection/     # 공식 디스코드, 트위터, 문의 링크 섹션
│   ├── CountDownTimer/     # 민팅 라운드 시작 카운트다운 타이머
│   ├── HousePreview/       # 하우스/아바타 캐릭터 3D isometric 인터랙티브 프리뷰
│   ├── MainAppBar/         # 상단 헤더 메뉴 바 및 지갑 연결 버튼
│   ├── MainDrawer/         # 모바일 화면 드로어 내비게이션
│   ├── MainFooter/         # 푸터 저작권 및 웹사이트 정보
│   └── MintBox/            # 실시간 민팅 진행 상태 표시 및 참여 버튼
├── icons/                  # SVG 로고, 화살표, 햄버거 메뉴 컴포넌트
├── layouts/
│   ├── Main/               # 메인 랜딩 히어로 섹션
│   ├── NFT/                # VTOK 컬렉션 NFT 갤러리 컴포넌트
│   ├── Partner/            # 파트너사 로고 및 카러셀
│   ├── Roadmap/            # 타임라인 형태의 로드맵
│   ├── Service/            # 탭 방식의 서비스 소개 (Pet, Story, Feature)
│   └── Team/               # 프로필 카드 형태의 팀원 소개
└── res/
    ├── strings.js          # 공통 한글/영문 텍스트 상수
    ├── theme.js            # MUI 커스텀 컬러 팰렛 및 다크/라이트 테마
    └── windowSize.js       # 반응형 브레이크포인트 리스너
```

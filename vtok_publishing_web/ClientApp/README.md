# 📱 VTOK Publishing Web ClientApp (React Frontend)

`vtok_publishing_web` 프로젝트 내부에 포함된 React 기반의 SPA 프론트엔드입니다.  
VTOK 서비스 소개, 로드맵, 팀 소개, NFT 미리보기 및 민팅 타임 박스 기능을 제공합니다.

---

## 📂 디렉토리 구조 (Directory Structure)

```text
ClientApp/
├── public/               # HTML 템플릿 및 파비콘 등 정적 파일
├── src/
│   ├── api/              # 백엔드 REST API 호출 모듈 (apiRequests.js, request.js)
│   ├── assets/           # 그래픽 이미지, 애니메이션 WebP/GIF, 아이콘 자원
│   ├── components/       # 재사용 가능한 UI 컴포넌트
│   │   ├── ContactSection/   # 문의/연락처 섹션
│   │   ├── CountDownTimer/   # NFT 민팅 시작 카운트다운 타이머
│   │   ├── HousePreview/     # 3D/하우스 캐릭터 프리뷰
│   │   ├── MainAppBar/       # 상단 메인 내비게이션 바
│   │   ├── MainDrawer/       # 모바일 반응형 드로어 메뉴
│   │   ├── MainFooter/       # 하단 푸터 컴포넌트
│   │   └── MintBox/          # NFT 민팅 상태 및 진행 박스
│   ├── icons/            # SVG 아이콘 컴포넌트 (Logo, Arrow, Hamburger)
│   ├── layouts/          # 주요 페이지 레이아웃 섹션
│   │   ├── Main/             # 메인 홈 레이아웃
│   │   ├── NFT/              # NFT 갤러리 섹션
│   │   ├── Partner/          # 파트너십 소개 섹션
│   │   ├── Roadmap/          # 프로젝트 로드맵 섹션
│   │   ├── Service/          # 주요 서비스 상세 및 페이징 탭
│   │   └── Team/             # 팀원 소개 섹션
│   └── res/              # 공통 테마, 스트링 자원, 스크롤러 및 유티리티
└── package.json
```

---

## 🔧 주요 설정 및 스크립트

- **설치**: `npm install`
- **개발 서버 실행**: `npm start`
- **빌드**: `npm run build`

# 📂 ClientApp/src/components - UI 컴포넌트 명세

`vtok_publishing_web/ClientApp` 프론트엔드의 재사용 가능한 React UI 컴포넌트 모듈 디렉토리입니다.

---

## 📄 파일 명세

- **`CountDownTimer/index.js`**: 백엔드 라운드 목표 시각까지의 남은 초를 1초 간격 인터벌로 계산하여 D-Day/시/분/초 카운트다운 타이머 렌더링.
- **`MintBox/index.js`**: SignalR 웹소켓 `/chatHub` 연결 ➔ `Receive("Count", cnt)` 이벤트 리스너 수신 및 민팅 진행률 Bar/버튼 렌더링.
- **`HousePreview/index.js`**: 3D Isometric 캐릭터 & 펫 그래픽 애니메이션 자원 프리뷰 컴포넌트.
- **`ContactSection/index.js`**: 공식 Discord, Twitter, Medium, Telegram SNS 아웃링크 버튼 모듈.
- **`MainAppBar/index.js` & `MainDrawer/index.js`**: 상단 헤더 메뉴 바 및 반응형 모바일 메뉴 드로어.
- **`MainFooter/index.js`**: 하단 푸터 저작권 및 서비스 이용약관 레이아웃.

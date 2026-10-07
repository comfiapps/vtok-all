# 🎨 Res (Resources) - 디자인 테마, 문자열 및 전역 상수

컴포넌트 전반에서 재사용되는 테마, 다국어 텍스트 및 레이아웃 상수를 집중 관리하는 리소스 디렉토리입니다.

* **`theme.js`**: Material-UI 커스텀 테마 정의 (팔레트 색상 `#FF6B00`, 폰트 `Noto Sans KR`, 브레이크포인트).
* **`strings.js`**: UI에 출력되는 모든 한글/영문 텍스트 상수 키-값 매핑.
* **`values.js`**: 최대 컨테이너 폭(`breakpoint`), 각 섹션별 배경색 및 Dark 모드 플래그 배열.
* **`windowSize.js`**: 브라우저 창 크기 변화를 감지하는 React 커스텀 훅(`useWindowDimensions`).
* **`scroller.js`**: 뷰포트 스크롤 위치를 추적하여 현재 활성 섹션 인덱스를 갱신하는 스크롤 관리 모듈.

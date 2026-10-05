# 📂 VTOK Admin Frontend - `src` 디렉토리 안내

`vtok_admin_frontend`의 핵심 리액트 소스 코드가 포함된 디렉토리입니다.

---

## 📄 디렉토리 구성 (Structure Detail)

- **`api/`**
  - `request.js`: 서버 REST API와의 통신을 처리하는 Axios Wrapper 모듈.

- **`page/`**
  - `CategoryPage.js`: 계층형 카테고리(Hierarchical Category) 조회, 생성, 수정 관리 페이지.
  - `FilePage.js`: 파일 리스트 조회, 업로드, 삭제 및 다운로드 관리 페이지.
  - `FileHistoryPage.js`: 파일 변경 및 작업 이력 트래킹 데이터그리드 페이지.

- **`component/`**
  - `CustomDataGrid.js`: MUI DataGrid 기반의 공통 테이블 그리드 컴포넌트.
  - `CategoryCreateDialog.js` / `CategoryModifyDialog.js`: 카테고리 생성 및 수정 모달 대화상자.
  - `FileUploadDialog.js` / `FileUpdateDialog.js`: 파일 신규 업로드 및 버전 업데이트 대화상자.
  - `DeleteAlert.js`: 삭제 확인 팝업 경고창.
  - `DialogLayout.js` / `TitleBar.js` / `SearchBar.js` / `MainAppBar.js`: 어드민 쉘 레이아웃 요소.

- **`res/`**
  - `common.js`: 공통 헬퍼 함수.
  - `strings.js`: UI 한글/영문 텍스트 상수.
  - `testData.js`: 개발용 목업(Mock) 데이터.

# 📂 src/component - 어드민 UI 컴포넌트 & 모달 명세

어드민 백오피스의 공통 대화상자(Dialog) 및 데이터그리드 UI 컴포넌트 디렉토리입니다.

---

## 📄 파일 명세

- **`CategoryCreateDialog.js`**: 상위 카테고리 코드 `preCode` 기반으로 신규 카테고리를 생성하는 대화상자 (`POST /api/add/category`).
- **`CategoryModifyDialog.js`**: 선택된 카테고리의 명칭/코드를 수정하는 대화상자 (`POST /api/mod/category`).
- **`FileUploadDialog.js`**: 파일 선택, 버전 및 설명 입력을 포함한 파일 업로드 대화상자.
- **`FileUpdateDialog.js`**: 기존 파일의 신규 버전 업데이트 대화상자.
- **`HierarcialCategory.js`**: 카테고리 삭제 시 하위 연관 항목을 이관할 대상 카테고리를 트리고 선택하는 Select 컴포넌트.
- **`CustomDataGrid.js`**: MUI DataGrid Pro 래퍼 컴포넌트 (`rows`, `columns`, `grouping` 바인딩).
- **`DeleteAlert.js`**: 삭제 승인 확인 경고창.
- **`TitleBar.js` & `SearchBar.js`**: 서치바 정규식 검색(`escapeRegExp`)을 포함한 대시보드 타이틀바.

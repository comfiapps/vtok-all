# 📂 VTOK Admin Frontend - `src` 상세 모듈 구성

관리자 백오피스 소스 코드의 컴포넌트별 상세 역할 및 계층 데이터 조작 로직 설명입니다.

---

## 📄 핵심 구현 및 컴포넌트 분석

### 1. 카테고리 계층 구조 처리 (`CategoryPage.js` & `HierarcialCategory.js`)
- 카테고리 코드는 N자리 규칙(예: `10`, `1001`, `100101` 등 2자리 단위 파싱 `strings.codeLength`)을 따릅니다.
- MUI DataGrid Pro의 `grouping` 속성을 활용하여 트리 뷰 구조로 렌더링합니다.
- **카테고리 삭제 모달 (`Dialog` & `HierarcialCategory`)**: 카테고리를 삭제할 때 하위 아이템을 이관할 대상 카테고리를 선택하거나, 미선택 시 하위 연관 데이터 일괄 삭제 경고 처리(`line`, `reline`).

### 2. 파일 관리 및 버전 수정 (`FilePage.js` & `FileUpdateDialog.js`)
- 파일 등록 시 다중 파라미터(카테고리 코드, 파일명, 버전, 설명 등) 전송.
- `CustomDataGrid.js`를 이용한 필터링 및 서치바 정규식 검색(`escapeRegExp`).

### 3. 변경 이력 모니터링 (`FileHistoryPage.js`)
- 누가/언제/어떤 파일을 업로드/수정/삭제했는지 시간순 데이터그리드 모니터링.

---

## 🛠️ 공통 모듈 (`api/`, `res/`)
- `api/request.js`: HTTP 401/500 에러 처리 및 기본 Header 설정 Axios 인스턴스.
- `res/common.js`: 정규 표현식 이스케이프 함수 `escapeRegExp(string)`.

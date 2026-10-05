# 📂 VTOK Admin Frontend - `src` 상세 알고리즘 & 컴포넌트 명세

어드민 백오피스 소스 코드의 컴포넌트별 Props, State 및 핵심 계층 알고리즘 설명입니다.

---

## 🧩 1. 핵심 컴포넌트 사양 (Component Specs)

### `page/CategoryPage.js` (카테고리 관리 페이지)
- **State**:
  - `createOpen` (boolean): 카테고리 추가 모달 열림 상태
  - `parent` (number|null): 상위 카테고리 Line 코드
  - `edit` (object|null): 수정 대상 카테고리 데이터 Row
  - `alert` (number|null): 삭제 대상 카테고리 Line 코드
  - `move` (number|null): 삭제 시 자식 항목 이관 대상 카테고리 Line 코드
  - `rows` (array): 전체 카테고리 목록
  - `filtered` (array): 정규식 검색 필터링 결과
- **DataGrid Grouping Logic**:
  ```js
  grouping={r => {
      const codeString = r.Line.toString();
      let splits = [];
      for (let i = 2; i <= codeString.length; i += strings.codeLength) splits.push(codeString.substr(0, i));
      return splits;
  }}
  ```
  - `Line` 숫자를 문자열로 전환 후 2자리(`strings.codeLength = 2`) 단위로 잘라 트리 깊이(Depth) 그룹 분생.

### `component/CategoryCreateDialog.js`
- **Props**:
  - `isOpen` (boolean): 대화상자 표시 여부
  - `close` (function): 닫기 이벤트 핸들러
  - `confirmText` (string): 확인 버튼 텍스트 ("추가")
  - `preCode` (number): 상위 카테고리 코드 ID
  - `onSuccess` (function): 성공 후 리프레시 콜백 함수

### `component/CategoryModifyDialog.js`
- **Props**:
  - `isOpen` (boolean), `close` (function), `confirmText` (string), `data` (object), `onSuccess` (function)

### `component/HierarcialCategory.js`
- **Props**:
  - `view` (number): 현재 삭제 진행 중이라 선택 불가능한 카테고리 ID
  - `selected` (number): 사용자가 이관 대상으로 선택한 카테고리 ID
  - `onSelect` (function): 선택 변경 이벤트 콜백

### `component/CustomDataGrid.js`
- **Props**:
  - `pro` (boolean): MUI DataGrid Pro 모드 사용 여부
  - `rows`, `filtered`, `columns`, `rowId`, `grouping`

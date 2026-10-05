# 📂 VTOK Admin Frontend - `src` 상세 컴포넌트 명세

어드민 백오피스 소스 코드의 컴포넌트별 Props, State 및 핵심 계층 알고리즘 설명입니다.

---

## 🧩 컴포넌트 Props & State 명세

### 1. `component/CategoryCreateDialog.js`
- **Props**:
  - `isOpen` (`boolean`): 모달 오픈 상태
  - `close` (`function`): 닫기 핸들러
  - `confirmText` (`string`): 확인 버튼 Label ("추가")
  - `preCode` (`number`): 상위 카테고리 ID (`Line`)
  - `onSuccess` (`function`): 생성 성공 후 리프레시 콜백
- **동작**: 입력된 카테고리 이름과 `preCode`를 조합하여 `POST /api/add/category` 전송.

### 2. `component/CategoryModifyDialog.js`
- **Props**:
  - `isOpen` (`boolean`), `close` (`function`), `confirmText` (`string`), `data` (`object`), `onSuccess` (`function`)
- **동작**: 선택된 카테고리 `Line`, `Name`, `Code` 정보를 폼에 수용하고 `POST /api/mod/category` 호출.

### 3. `component/HierarcialCategory.js`
- **Props**:
  - `view` (`number`): 현재 삭제 진행 중인 카테고리 ID (자신 및 하위 카테고리는 이관 대상에서 제외)
  - `selected` (`number`): 이관 대상으로 선택된 카테고리 ID
  - `onSelect` (`function`): 선택 변경 시 ID 전달 콜백

### 4. `component/CustomDataGrid.js`
- **Props**:
  - `pro` (`boolean`): MUI DataGrid Pro 인스턴스 사용 여부
  - `rows` (`array`), `filtered` (`array`), `columns` (`array`), `rowId` (`function`), `grouping` (`function`)

---

## 📐 카테고리 트리 그룹핑 코드
```js
grouping={r => {
    const codeString = r.Line.toString();
    let splits = [];
    for (let i = 2; i <= codeString.length; i += strings.codeLength) {
        splits.push(codeString.substr(0, i));
    }
    return splits;
}}
```
`Line` 코드가 `100102`인 경우, `["10", "1001", "100102"]` 배열을 생성하여 3단계 계층 트리 노드로 배치합니다.

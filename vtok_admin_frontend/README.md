# 🖥️ VTOK Admin Frontend (VTOK 관리자 백오피스 명세서)

VTOK 플랫폼 운영자를 위한 전용 React 백오피스 어드민 웹 애플리케이션입니다.  
시스템 내 계층형 카테고리(Hierarchical Category) 관리, 파일 라이브러리 업로드/수정/삭제 및 파일 변경 이력(Audit Log History) 모니터링을 제공합니다.

---

## 🛠️ 기술 스택 및 라이브러리 (Tech Stack)

- **Framework**: React.js 17+ (React Router DOM v5)
- **UI Toolkit**: Material-UI (MUI v5)
- **DataGrid Engine**: `@mui/x-data-grid-pro` (계층형 트리 데이터 그룹핑 및 액션 버튼)
- **Icons**: `@mui/icons-material` (`AccountTreeRounded`, `AddRounded`, `DeleteRounded`, `EditRounded`)
- **HTTP Client**: Axios (`src/api/request.js`)

---

## 🔌 API 명세 및 파라미터 구조 (API Specifications)

### 1. 카테고리 관리 API (`CategoryPage.js`)
- `GET /api/get/category`: 카테고리 전체 목록 조회
  - Response: `[{ Line: 10, Name: "메인", Code: 0 }, { Line: 1001, Name: "서브", Code: 10 }]`
- `POST /api/add/category`: 신규 카테고리 생성
  - Body: `{ line: number, name: string, code: number }`
- `POST /api/mod/category`: 카테고리 이름/코드 수정
  - Body: `{ line: number, name: string, code: number }`
- `POST /api/del/category?line={alert}&reline={move}`: 카테고리 삭제
  - Query Params:
    - `line` (number): 삭제할 대상 카테고리 Line 코드 ID
    - `reline` (number|null): 삭제할 카테고리 하위 항목들을 이관할 변경 카테고리 Line 코드 ID (미지정 시 자식 항목 일괄 삭제)

### 2. 파일 관리 API (`FilePage.js`)
- `GET /api/get/file`: 등록된 파일 리스트 조회
- `POST /api/add/file`: 신규 파일 등록 (FormData Multi-part: `file`, `name`, `categoryCode`, `version`)
- `POST /api/mod/file`: 파일 수정 (FormData: `fileId`, `version`, `description`)
- `POST /api/del/file`: 파일 삭제 (`fileId`)

### 3. 파일 이력 관리 API (`FileHistoryPage.js`)
- `GET /api/get/file/history`: 파일 작업 이력 전체 데이터그리드 조회

---

## 📂 소스 디렉토리 안내

- **`src/api/request.js`**: Axios Wrapper 모듈.
- **`src/page/CategoryPage.js`**: 카테고리 트리 UI 대시보드.
- **`src/page/FilePage.js`**: 파일 라이브러리 관리 UI 대시보드.
- **`src/page/FileHistoryPage.js`**: Audit 로그 이력 조회 UI 대시보드.

- **[src README 바로가기](./src/README.md)**: 소스 컴포넌트 및 알고리즘 구현 안내.

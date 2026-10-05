# 🖥️ VTOK Admin Frontend (VTOK 관리자 백오피스 웹)

VTOK 플랫폼 운영자를 위한 전용 React 백오피스 어드민 웹 애플리케이션입니다.  
시스템 내 계층형 카테고리(Hierarchical Category) 관리, 파일 라이브러리 업로드/수정/삭제 및 파일 변경 이력(Audit Log History) 모니터링을 제공합니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Framework**: React.js 17+ (React Router DOM)
- **UI Component & Grid**: Material-UI (MUI v5), `@mui/x-data-grid-pro` (계층형 데이터 트리 및 액션 렌더링)
- **HTTP Client**: Axios (REST API 연동)

---

## 🔌 연동 백엔드 REST API 명세 (API Endpoints)

| 페이지 | Method | Endpoint | 설명 |
| :--- | :--- | :--- | :--- |
| **CategoryPage** | `GET` | `/api/get/category` | 계층 구조 카테고리 전체 목록 조회 |
| | `POST` | `/api/add/category` | 신규 카테고리 및 상위 코드 연동 추가 |
| | `POST` | `/api/mod/category` | 기존 카테고리 명칭/코드 수정 |
| | `POST` | `/api/del/category` | 카테고리 삭제 (자식 항목 이동 지정 옵션) |
| **FilePage** | `GET` | `/api/get/file` | 특정 카테고리 내 등록된 파일 목록 조회 |
| | `POST` | `/api/add/file` | 신규 파일 메타데이터 및 바이너리 업로드 |
| | `POST` | `/api/mod/file` | 파일 버전/명칭 수정 |
| | `POST` | `/api/del/file` | 파일 삭제 |
| **FileHistoryPage**| `GET` | `/api/get/file/history` | 파일의 생성, 수정, 삭제 작업 Audit 로그 조회 |

---

## 📂 디렉토리 구조 (Directory Structure)

```text
vtok_admin_frontend/
├── public/               # HTML 템플릿 및 파비콘
├── src/                  # 어드민 소스 디렉토리 (상세 설명은 src/README.md)
│   ├── api/              # Axios 기반 REST API 인스턴스 모듈
│   ├── component/        # 공통 Dialog, CustomDataGrid, HierarcialCategory 컴포넌트
│   ├── page/             # CategoryPage, FilePage, FileHistoryPage 대시보드
│   └── res/              # escapeRegExp 유틸리티, 텍스트 상수, 목업 테스트 데이터
└── README.md
```

- **[src README 바로가기](./src/README.md)**: 소스 컴포넌트 및 알고리즘 구현 안내.

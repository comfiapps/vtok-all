# 🖥️ VTOK Admin Frontend (VTOK 관리자 백오피스 웹)

VTOK 서비스 관리자를 위한 전용 React 어드민 프론트엔드 대시보드입니다.  
카테고리 계층 구조 관리, 파일 업로드/수정/삭제 및 이력 트래킹 기능을 제공합니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Framework**: React.js (Create React App)
- **UI Component**: Material-UI (MUI), MUI DataGrid (`@mui/x-data-grid`)
- **HTTP Client**: Axios (REST API 연동)

---

## 📂 주요 디렉토리 구조 (Directory Structure)

```text
vtok_admin_frontend/
├── public/               # 정적 자원 (index.html, manifest.json)
├── src/                  # 소스 코드 디렉토리
│   ├── api/              # Axios 기반 API 연동 모듈
│   ├── component/        # 공통 대화상자(Dialog), 데이터그리드, 타이틀바 컴포넌트
│   ├── page/             # 어드민 주요 대시보드 페이지 (Category, File, FileHistory)
│   └── res/              # 공통 유틸리티 및 테스트 데이터
└── README.md
```

- **[src README 바로가기](./src/README.md)**: src 내 컴포넌트 및 페이지 상세 구성 설명.

---

## 🚀 실행 방법 (Execution)

```bash
# 패키지 설치
npm install

# 개발 서버 실행 (기본 포트: 3000)
npm start
```

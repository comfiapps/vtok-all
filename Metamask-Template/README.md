# 🦊 Metamask Template (메타마스크 연동 React 템플릿)

React 서비스에서 MetaMask 브라우저 지갑 확장 프로그램을 연결하고, 계정 변경(`accountsChanged`) 및 네트워크 변경(`chainChanged`) 이벤트를 리스닝하기 위한 템플릿 모듈입니다.

---

## 🛠️ 주요 기능 (Key Features)

- `window.ethereum` 프로바이더 존재 여부 감지
- `eth_requestAccounts`를 통한 지갑 연결 요청
- 지갑 계정 전환 및 체인 ID 변경 시 자동 상태 업데이트

---

## 📂 디렉토리 구조 (Directory Structure)

```text
Metamask-Template/
├── public/
├── src/
│   └── Page/
│       ├── Connect.js    # 지갑 연결 버튼 및 계정 정보 표시 컴포넌트
│       └── Change.js     # 네트워크/계정 변경 이벤트 리스너 컴포넌트
└── README.md
```

- **[src README 바로가기](./src/README.md)**: 소스 구성 설명.

# ⛓️ Ethereum Transaction Test (웹 지갑 연동 & 전송 테스트)

이더리움 및 EVM 호환 네트워크에서 암호화폐(ETH) 및 ERC-20/721 토큰 전송과 잔액 조회를 테스트하는 React 클라이언트 애플리케이션입니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend**: React.js
- **Web3 Wallet Integration**: Web3.js, Ethers.js, MetaMask Wallet Provider, TrustWallet Provider

---

## 📂 디렉토리 구조 (Directory Structure)

```text
ethereum-transaction-test/
├── public/                # HTML 템플릿
├── src/                   # 소스 코드
│   ├── abi/               # 스마트 컨트랙트 ABI JSON (erc20ABI.json)
│   ├── Component/         # 탭(Tabs) 및 상단바(TopBar) UI
│   ├── Constant/          # 이더리움 체인 정보 및 상수 정의
│   ├── Icon/              # 지갑 로고 SVG (MetaMask, TrustWallet)
│   ├── Metamask/          # 메타마스크 전송, 잔액, ERC-20/721 전송 컴포넌트
│   └── TrustWallet/       # 트러스트월렛 연동 컴포넌트
└── README.md
```

- **[src README 바로가기](./src/README.md)**: src 소스 디렉토리 세부설명.

# ⛓️ Ethereum Transaction Test (웹 지갑 연동 & 전송 테스트)

이더리움 메인넷/테스트넷 및 EVM 호환 네트워크에서 MetaMask 및 TrustWallet 연동, ETH 및 ERC-20 / ERC-721 토큰 잔액 조회, 토큰 Transfer 트랜잭션을 실습하는 React 테스트 어플리케이션입니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend**: React.js 17+
- **Blockchain Web3 Provider**: Web3.js, Ethers.js (`ethers.providers.Web3Provider`)
- **Supported Wallets**: MetaMask Wallet Extension, TrustWallet In-App Browser & WalletConnect

---

## 📂 디렉토리 구조 (Directory Structure)

```text
ethereum-transaction-test/
├── public/                # HTML 템플릿 (index.html)
├── src/                   # React 소스 디렉토리 (상세 설명은 src/README.md)
│   ├── abi/               # 표준 컨트랙트 ABI JSON 파일 (erc20ABI.json)
│   ├── Component/         # 탭(Tabs) 및 상단 헤더 바 UI
│   ├── Constant/          # 이더리움 체인 상수 (ethereum.js)
│   ├── Icon/              # 지갑 로고 SVG 컴포넌트
│   ├── Metamask/          # 메타마스크 전송, 잔액, ERC-20/721 처리 모듈
│   └── TrustWallet/       # 트러스트월렛 연결 모듈
└── README.md
```

- **[src README 바로가기](./src/README.md)**: 지갑 및 토큰 연동 소스 코드 상세 설명.

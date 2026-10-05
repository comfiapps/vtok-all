# ⛓️ Ethereum Transaction Test (웹 지갑 연동 & 전송 테스트 명세서)

이더리움 메인넷/테스트넷 및 EVM 호환 블록체인 상에서 웹 지갑(MetaMask 및 TrustWallet) 연동, ETH 잔액 조회, ERC-20/721 토큰 전송 트랜잭션을 실습하는 React 테스트 어플리케이션입니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend**: React.js 17+
- **Blockchain Libraries**: `ethers` v5 (`ethers.providers.Web3Provider`), `web3` v1.x
- **UI Components**: Material-UI (MUI v5) `Accordion`, `TextField`, `Stack`

---

## 📂 디렉토리 및 컴포넌트 구조

```text
ethereum-transaction-test/
├── public/                # HTML 템플릿 (index.html)
├── src/                   # React 소스 디렉토리 (상세 설명은 src/README.md)
│   ├── abi/               # 표준 컨트랙트 ABI JSON 파일 (erc20ABI.json)
│   ├── Component/         # Tabs, TopBar UI
│   ├── Constant/          # 이더리움 체인 정보 (ethereum.js)
│   ├── Icon/              # MetamaskIcon, TrustWalletIcon SVG
│   ├── Metamask/          # Balance, ERC20, ERC721, Transaction, Transfer, Info
│   └── TrustWallet/       # TrustWallet 연동 모듈
└── README.md
```

- **[src README 바로가기](./src/README.md)**: 소스 컴포넌트 코드 설명.

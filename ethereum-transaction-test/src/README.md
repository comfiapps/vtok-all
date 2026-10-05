# 📂 ethereum-transaction-test - `src` 디렉토리 구성

이더리움 및 지갑 연동 기능 모듈별 안내입니다.

---

## 🔧 모듈 구성

- **`Metamask/`**
  - `index.js`: 메타마스크 연동 메인 뷰.
  - `Balance.js`: 현재 연결된 계정의 ETH 잔액 조회.
  - `ERC20.js`: ERC-20 토큰 잔액 조회 및 전송(Transfer) 호출.
  - `ERC721.js`: ERC-721 NFT 토큰 소유권 확인 및 전송.
  - `Transaction.js` / `Transfer.js`: ETH 트랜잭션 서명 및 발송.
  - `Info.js`: 체인 ID(Chain ID), 네트워크 정보 표시.

- **`TrustWallet/`**
  - `index.js`: TrustWallet 인앱 브라우저 및 WalletConnect 연동 모듈.

- **`abi/`**
  - `erc20ABI.json`: 표준 ERC-20 컨트랙트 인터페이스 정의.

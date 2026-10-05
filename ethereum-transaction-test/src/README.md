# 📂 ethereum-transaction-test - `src` 상세 모듈 명세

웹 브라우저 지갑 연동 및 이더리움 스마트 컨트랙트 호출 모듈의 구현 설명입니다.

---

## 📄 핵심 모듈 및 컴포넌트

### 1. MetaMask 연동 모듈 (`src/Metamask/`)
- **`Balance.js`**: `provider.getBalance(address)`를 호출하여 계정의 코인 잔액(ETH/KLAY)을 조회하고 `ethers.utils.formatEther`로 단위 변환.
- **`ERC20.js`**: `erc20ABI.json` 인터페이스를 로드하여 `balanceOf(address)` 조회 및 `transfer(toAddress, amount)` 토큰 전송.
- **`ERC721.js`**: `ownerOf(tokenId)` 및 `safeTransferFrom(from, to, tokenId)` 메서드를 통한 NFT 소유권 조회 및 전송.
- **`Transaction.js` / `Transfer.js`**: MetaMask에 raw 트랜잭션 전송 팝업(`eth_sendTransaction`) 요청.
- **`Info.js`**: `window.ethereum.networkVersion` 및 `eth_chainId` 조회.

### 2. TrustWallet 연동 모듈 (`src/TrustWallet/`)
- `TrustWallet/index.js`: 모바일 TrustWallet 앱 브라우저 및 Deep-Link 지원.

### 3. ABI 정적 자원 (`src/abi/`)
- `erc20ABI.json`: `name`, `symbol`, `decimals`, `totalSupply`, `balanceOf`, `transfer`, `approve`, `allowance` 표준 메서드 정의.

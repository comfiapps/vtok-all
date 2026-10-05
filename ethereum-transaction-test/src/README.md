# 📂 ethereum-transaction-test - `src` 상세 컴포넌트 명세

### 1. `src/Metamask/ERC20.js`
- **Default Contract Address**: `0x821848f05AD89c0264e7f99a6a4baae29a9a2786`
- **Accordion Sub-Sections**:
  1. `My Balance`: `<Balance contractAddress={contract} />`
  2. `Token Info`: `<Info contractAddress={contract} />`
  3. `Transfer`: `<Transfer contractAddress={contract} />`
  4. `Recent Transaction`: `<Transaction contractAddress={contract} />`
- **Address Validation**: `ethers.utils.isAddress(contract)` 유효성 검사.

### 2. `src/Metamask/Balance.js`
- `new ethers.providers.Web3Provider(window.ethereum).getBalance(account)` 호출 후 `ethers.utils.formatEther(balance)`로 단위 변환.

### 3. `src/abi/erc20ABI.json`
- 표준 ERC-20 ABI: `balanceOf(address)`, `transfer(to, amount)`, `approve(spender, amount)`, `allowance(owner, spender)`, `totalSupply()`.

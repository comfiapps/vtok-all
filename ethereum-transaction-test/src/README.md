# 📂 ethereum-transaction-test - `src` 상세 컴포넌트 & Ethers.js 코드 명세

### 1. `src/Metamask/ERC20.js`
- **Default Contract Address**: `0x821848f05AD89c0264e7f99a6a4baae29a9a2786`
- **Accordion Sub-Sections**:
  1. `My Balance`: `<Balance contractAddress={contract} />`
  2. `Token Info`: `<Info contractAddress={contract} />`
  3. `Transfer`: `<Transfer contractAddress={contract} />`
  4. `Recent Transaction`: `<Transaction contractAddress={contract} />`
- **Address Validation**: `ethers.utils.isAddress(contract)` 유효성 검사.

### 2. `src/Metamask/Balance.js`
```js
const provider = new ethers.providers.Web3Provider(window.ethereum);
const accounts = await provider.send("eth_requestAccounts", []);
const balance = await provider.getBalance(accounts[0]);
const ethBalance = ethers.utils.formatEther(balance);
```

### 3. `src/Metamask/Transfer.js`
```js
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, erc20ABI, signer);
const tx = await contract.transfer(recipientAddress, ethers.utils.parseUnits(amount, 18));
await tx.wait();
```

### 4. `src/abi/erc20ABI.json`
- 표준 ERC-20 ABI: `balanceOf(address)`, `transfer(to, amount)`, `approve(spender, amount)`, `allowance(owner, spender)`, `totalSupply()`.

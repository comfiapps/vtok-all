# 📂 Metamask - 메타마스크 연동 모듈 명세

Ethers.js 및 MetaMask 확장을 이용한 잔액/토큰 트랜잭션 전송 모듈입니다.

---

## 📄 파일 명세

- **`ERC20.js`**: default contract `0x821848f05AD89c0264e7f99a6a4baae29a9a2786` 주소를 기반으로 `Balance`, `Info`, `Transfer`, `Transaction` Accordion UI 제공.
- **`Balance.js`**: `provider.getBalance(account)` 호출 후 `formatEther` 변환.
- **`Transfer.js`**: `contract.transfer(recipient, amount)` 호출 및 트랜잭션 마이닝 대기 (`tx.wait()`).
- **`ERC721.js`**: NFT `ownerOf` 및 `safeTransferFrom` 호출.
- **`Transaction.js`**: 최근 전송 내역 표시.
- **`Info.js`**: 체인 ID 및 네트워크 정보 표시.

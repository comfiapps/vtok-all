# 📂 Controllers - 민팅 API 컨트롤러 명세

`vtok-minting` 백엔드의 HTTP 엔드포인트 수신 계층입니다.

---

## 📄 파일 명세

- **`MintController.cs`**: `POST /Mint` 엔드포인트 수신 ➔ IPFS 업로드 및 Nethereum Web3 온체인 ERC-721 민팅 발송.
- **`TokenController.cs`**: `GET /Token`, `POST /Token`, `DELETE /Token` ➔ 토큰 엔티티 CRUD.
- **`WhitelistController.cs`**: `GET /Whitelist`, `POST /Whitelist` ➔ 화이트리스트 주소 검증 및 등록.
- **`ContractController.cs`**: `GET /Contract` ➔ 배포된 스마트 컨트랙트 주소 정보 반환.

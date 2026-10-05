# 📂 ContractFunctions - Nethereum ABI 매핑 DTO 명세

스마트 컨트랙트 ABI 매핑 Nethereum DTO 클래스 모듈입니다.

---

## 📄 파일 명세

- **`ERC721TransferFunction.cs`**: `[Function("safeTransferFrom")]` ➔ `From`, `To`, `TokenId` 매핑.
- **`ERC1155TransferFunction.cs`**: `[Function("safeBatchTransferFrom")]` ➔ `From`, `To`, `Ids`, `Amounts`, `Data` 배치 전송 매핑.

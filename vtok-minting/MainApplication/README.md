# 📂 VTOK Minting - `MainApplication` 상세 클래스 및 Web3 유틸리티 명세

`vtok-minting` 프로젝트의 Web3 라이브러리 및 Nethereum DTO 클래스 구현 세부사항입니다.

---

## 🛠️ Web3 & Solidity ABI 매핑 클래스 (`Utils/`)

### 1. `Web3Functions.cs`
- **`IsValidAddress(string address)`**:
  - `Regex("^(0x){1}[0-9a-fA-F]{40}$")` 및 Nethereum `AddressUtil().IsChecksumAddress(address)`를 활용한 지갑 주소 정규식 검증.
- **`GetERC721ContractOwner(string contractAddress)`**:
  - Nethereum QueryHandler `ERC721ContractOwnerFunction` 호출 ➔ 컨트랙트 소유자 주소 반환.
- **`GetERC721OwnerOf(string contractAddress, int tokenId)`**:
  - Nethereum QueryHandler `ERC721OwnerOfFunction` (`TokenId = tokenId`) 호출 ➔ 온체인 NFT 소유자 주소 반환.
- **`MintERC721(string contract, string url)`**:
  - Nethereum TransactionHandler `ERC721MintFunction` (`TokenURI = url`) ➔ 온체인 트랜잭션 전송 및 트랜잭션 영수증(`TransactionReceipt`) 반환 ➔ `DecodeAllEvents<ERC721MintEventDto>()`를 통해 발급된 `TokenId` 디코딩 추출.

### 2. Nethereum ABI DTOs
- **`ERC721MintFunction.cs`**:
  - `[Function("mint")] public class ERC721MintFunction : FunctionMessage { [Parameter("string", "tokenURI", 1)] public string TokenURI { get; set; } }`
- **`ERC721MintEventDto.cs`**:
  - `[Event("Transfer")] public class ERC721MintEventDto : IEventDTO { [Parameter("address", "_from", 1, true)] public string From { get; set; } [Parameter("address", "_to", 2, true)] public string To { get; set; } [Parameter("uint256", "_tokenId", 3, true)] public BigInteger TokenId { get; set; } }`

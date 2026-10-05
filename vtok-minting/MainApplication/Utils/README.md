# 📂 Utils - Web3 및 IPFS 유틸리티 명세

블록체인 스마트 컨트랙트 통신 및 IPFS 분산 저장소 연동 모듈입니다.

---

## 📄 파일 명세

- **`IPFSFunction.cs`**: `UploadToNFTStorage(json)` ➔ `nft.storage` REST API로 업로드 후 CID 반환.
- **`Web3Functions.cs`**:
  - `IsValidAddress(address)`: 정규식 및 Checksum 검증.
  - `MintERC721(contract, url)`: Nethereum `ERC721MintFunction` 실행 ➔ 영수증 이벤트 `ERC721MintEventDto` 디코딩으로 `TokenId` 반환.
  - `GetERC721OwnerOf(contract, tokenId)`: Nethereum QueryHandler로 소유자 주소 조회.
  - `GetERC721ContractOwner(contract)`: 컨트랙트 소유자 주소 조회.
- **Solidity Function DTOs**:
  - `ERC721MintFunction.cs`: `mint(to, tokenURI)`
  - `ERC721OwnerOfFunction.cs`: `ownerOf(tokenId)`
  - `ERC721ContractOwnerFunction.cs`: `owner()`
  - `ERC721TransferFunction.cs`: `transferFrom(from, to, tokenId)`
  - `ERC721MintEventDto.cs`: `Transfer` 이벤트 맵핑 DTO

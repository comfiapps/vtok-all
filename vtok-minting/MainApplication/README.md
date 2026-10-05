# 📂 VTOK Minting - `MainApplication` 상세 명세

`vtok-minting` 백엔드 API 서비스의 컨트롤러, 서비스 모듈 및 스마트 컨트랙트 유틸리티 명세입니다.

---

## 🔌 API 엔드포인트 명세 (API Endpoints)

### 1. `MintController` (`[Route("[Controller]")]`)
- `POST /Mint`: NFT 메타데이터(`NFTMeta`)를 받아 IPFS에 업로드한 후 스마트 컨트랙트에서 토큰을 지정한 수량(`quantity`)만큼 온체인 민팅.

### 2. `TokenController` (`[Route("[Controller]")]`)
- `GET /Token`: DB에 기록된 전체 토큰 리스트 조회.
- `POST /Token`: 특정 컨트랙트 및 토큰 ID 매핑 정보 추가.
- `DELETE /Token`: 토큰 소유권 정보 및 엔티티 삭제.

### 3. `WhitelistController`
- `GET /Whitelist`: 민팅 가능 화이트리스트 계정 목록 조회.
- `POST /Whitelist`: 화이트리스트 주소 추가.

### 4. `ContractController`
- `GET /Contract`: 배포된 ERC-721 스마트 컨트랙트 주소 및 가스비 정보 조회.

---

## 🛠️ Web3 & IPFS 연동 모듈 (`Utils/`)

- **`IPFSFunction.cs`**
  - `UploadToNFTStorage(jsonString)`: `nft.storage` API에 JSON 분산 메타데이터 업로드 후 CID(Content Identifier) 반환.
- **`Web3Functions.cs`**
  - `MintERC721(contractAddress, tokenURI)`: Nethereum `Web3` 객체를 통해 ERC-721 스마트 컨트랙트의 `mint(address to, string tokenURI)` 함수 호출 및 블록체인 트랜잭션 마이닝 수신.
- **Contract Function DTOs**
  - `ERC721MintFunction.cs`: `mint(to, uri)` Solidity ABI DTO.
  - `ERC721OwnerOfFunction.cs`: `ownerOf(tokenId)` Solidity ABI DTO.
  - `ERC721TransferFunction.cs`: `transferFrom(from, to, tokenId)` Solidity ABI DTO.
  - `ERC721ContractOwnerFunction.cs`: 컨트랙트 오너 권한 검증 DTO.

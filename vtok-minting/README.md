# ⛏️ VTOK Minting Backend (NFT 민팅 Engine 상세 명세서)

VTOK 코어 시스템의 NFT 민팅, IPFS 메타데이터 업로드, 스마트 컨트랙트 트랜잭션 전송 및 화이트리스트 검증을 담당하는 백엔드 엔진 서비스입니다.

---

## 📐 1. 모듈 내부 아키텍처 (Module Architecture)

```mermaid
flowchart LR
    subgraph Client ["HTTP API Request"]
        REQ["POST /Mint
(contractAddress, NFTMeta)"]
    end

    subgraph Service ["vtok-minting Engine"]
        CTRL["MintController"]
        IPFS_UTIL["IPFSFunction
(NFT.Storage Upload)"]
        WEB3_ENGINE["Nethereum Web3 Service
(ERC721MintFunction)"]
        DB_CTX["ApplicationDbContext
(EF Core)"]
    end

    subgraph Infra ["External & Storage"]
        IPFS["IPFS / NFT.Storage
(Pinning API)"]
        ETH["Ethereum Rinkeby Net
(Smart Contract)"]
        MYSQL[("MySQL DB
- Tokens, Contracts")]
    end

    REQ --> CTRL
    CTRL --> IPFS_UTIL
    IPFS_UTIL -->|Bearer Auth| IPFS
    CTRL --> WEB3_ENGINE
    WEB3_ENGINE -->|RPC Tx| ETH
    CTRL --> DB_CTX
    DB_CTX --> MYSQL
```

---

## 🏗️ 1. 민팅 파이프라인 프로세스 (Minting Sequence Detail)

```mermaid
sequenceDiagram
    autonumber
    actor Client as Client / Admin
    participant API as MintController (.NET 6 API)
    participant Service as MintService
    participant IPFS as IPFS / NFT.Storage Pinning
    participant Web3 as Nethereum Web3 Engine
    participant Contract as ERC-721 Smart Contract
    participant DB as MySQL DB

    Client->>API: POST /Mint (contractAddress, NFTMeta, quantity)
    API->>Service: CreateToken(contractAddress, data, quantity)
    Service->>IPFS: UploadToNFTStorage(metadataJSON)
    IPFS-->>Service: Return IPFS CID (ipfs://...)
    loop Minting Quantity Times
        Service->>Web3: MintERC721(contractAddress, ipfsUrl)
        Web3->>Contract: Exec mint(to, tokenURI)
        Contract-->>Web3: Transaction Receipt & TokenID
        Service->>DB: Insert Token (contractAddress, tokenId)
    end
    Service-->>API: Task Completed
    API-->>Client: HTTP 200 OK
```

---

## 🔌 2. API 컨트롤러 상세 명세 (Controllers Specification)

### 2.1 `MintController.cs`
- `POST /Mint?contractAddress={contract}&quantity={quantity}`
  - Params: `contractAddress` (string), `quantity` (int, default=1)
  - Body: `NFTMeta` JSON 객체
  - Exceptions:
    - `"Contract Address Not Found"` (HTTP 409 Conflict)
    - `"Minting Started"` (HTTP 400 BadRequest)

### 2.2 `TokenController.cs`
- `GET /Token`: 전체 토큰 배열 반환 (`ActionResult<List<Token>>`)
- `POST /Token?contractAddress={contract}&tokenId={id}`: 토큰 엔티티 추가
- `DELETE /Token?contractAddress={contract}&tokenId={id}`: 토큰 삭제

### 2.3 `WhitelistController.cs`
- `GET /Whitelist`: 화이트리스트 주소 목록 조회
- `POST /Whitelist`: 화이트리스트 수량 지정 등록

---

## 📂 하위 README 링크
- **[MainApplication README 바로가기](./MainApplication/README.md)**: Web3 및 IPFS 유틸리티 함수 상세 명세.

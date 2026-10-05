# 📂 VTOK Minting - `MainApplication` 상세 안내

`vtok-minting` 서비스의 핵심 아키텍처 및 소스 코드 레이어 설명입니다.

---

## 🏗️ 레이어별 구성 (Architecture Layers)

### 1. Controllers (`Controllers/`)
- `MintController.cs`: NFT 민팅 요청 수신, 수량 제한 및 민팅 실행 엔드포인트.
- `TokenController.cs`: 토큰 ID 기반 메타데이터 조회 및 소유자 정보 조회.
- `WhitelistController.cs`: 화이트리스트 주소 등록, 검증 및 목록 조회 API.
- `ContractController.cs`: 스마트 컨트랙트 배포 정보 및 ABI 관리 API.

### 2. Services (`Services/`)
- `MintService.cs`: Nethereum 트랜잭션 전송 및 민팅 시퀀스 제어.
- `TokenService.cs`: 토큰 정보 생성 및 데이터베이스 저장.
- `WhitelistService.cs`: 화이트리스트 서명 및 주소 유효성 검증.
- `ContractService.cs`: 컨트랙트 상태 및 트랜잭션 영수증(Receipt) 처리.

### 3. Web3 & IPFS Utils (`Utils/`)
- `Web3Functions.cs`: Nethereum Web3 객체 생성 및 RPC 연동 헬퍼.
- `IPFSFunction.cs`: IPFS Node / Infura IPFS Pinning 서비스로 NFT 메타데이터 JSON 업로드.
- `ERC721MintFunction.cs` / `ERC721OwnerOfFunction.cs` / `ERC721TransferFunction.cs`: Solidity 스마트 컨트랙트 ABI 매핑 Nethereum Function DTO 객체.

### 4. Database Models & Repositories (`Models/`, `Repositories/`)
- `Contract.cs`, `Token.cs`, `Whitelist.cs`: EF Core 엔티티.
- `ApplicationDbContext.cs`: MySQL 연결 및 데이터베이스 컨텍스트.

# 📂 MintingTest - 프로젝트 구현 세부 명세

`minting-test` 백엔드 프로젝트의 Nethereum 스마트 컨트랙트 매핑 함수 및 테스트 컨트롤러 명세입니다.

---

## 🔧 주요 모듈 사양 (Key Components)

### 1. `ContractFunctions/` (Solidity ABI 매핑 DTO)
- **`ERC721TransferFunction.cs`**
  - `[Function("safeTransferFrom")]`: ERC-721 토큰 안전 전송 ABI 클래스.
- **`ERC1155TransferFunction.cs`**
  - `[Function("safeBatchTransferFrom")]`: ERC-1155 배치 전송 ABI 클래스.

### 2. `Controllers/`
- **`EthereumController.cs`**
  - 이더리움 노드 상태, 현재 블록 번호(Block Number) 및 가스비(Gas Price) 조회 테스트 API.
- **`MintController.cs`**
  - 테스트 환경에서의 화이트리스트 주소 검증 및 토큰 발급 테스트 컨트롤러.

### 3. `Services/`
- **`EthereumService.cs`**
  - Nethereum `Web3` 인스턴스 생성 및 트랜잭션 서명/영수증(Transaction Receipt) 반환 서비스.
- **`WhitelistService.cs`**
  - DB 기반 화이트리스트 주소 검증 및 신규 등록 처리.

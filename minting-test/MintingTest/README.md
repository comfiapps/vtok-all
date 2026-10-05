# 📂 MintingTest - 프로젝트 구성 상세

ERC-721 및 ERC-1155 규격 테스트 코드가 작성된 API 프로젝트 디렉토리입니다.

---

## 🔧 주요 구성 요소

- **`ContractFunctions/`**
  - `ERC721TransferFunction.cs`: ERC-721 토큰 소유권 이전 함수 DTO.
  - `ERC1155TransferFunction.cs`: ERC-1155 멀티토큰 배치 전송 함수 DTO.

- **`Controllers/`**
  - `EthereumController.cs`: 이더리움 블록체인 노드 연결 상태 확인 및 테스트 트랜잭션 수신 API.
  - `MintController.cs`: 민팅 테스트 컨트롤러.

- **`Services/`**
  - `EthereumService.cs`: Web3 트랜잭션 전송 및 가스비(Gas Limit/Gas Price) 계산 서비스.
  - `WhitelistService.cs`: 화이트리스트 주소 검증 서비스.

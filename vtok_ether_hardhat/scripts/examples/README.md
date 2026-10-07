# 📜 Scripts Examples - 스마트 컨트랙트 배포 & Web3 상호작용 명세

Hardhat 및 Web3.js를 활용하여 블록체인 노드와 상호작용하는 엔드-투-엔드 자바스크립트 스크립트 모음입니다.

---

## 📄 스크립트별 상세 명세

### 1. 배포 및 스캐너 스크립트
* **`example-erc721-deploy-script.js`**:
  * `ethers.getContractFactory("VtokNFT")`를 통해 컨트랙트를 컴파일하고 로컬 또는 테스트넷에 배포.
  * 배포된 컨트랙트 주소(`contract.address`) 출력 및 배포 트랜잭션 영수증 확인.
* **`example-erc721-scanner-script.js`**:
  * 블록체인에서 발행된 ERC-721 토큰의 `Transfer` 이벤트를 실시간 필터링하고 소유자 변경 내역을 수집하는 스캐너.
* **`example-erc721-external-script.js`**:
  * 외부 RPC 프로바이더(Infura, Alchemy)를 통해 배포된 컨트랙트의 `tokenURI`, `ownerOf` 등 읽기/쓰기 메서드 원격 실행.

### 2. Web3 저수준 인터페이스 스크립트
* **`web3_interface_account-scirpt.js`**:
  * `web3.eth.accounts.create()`를 통한 키쌍(공개키/개인키) 생성 및 계정 밸런스 조회.
* **`web3_interface_wallet-script.js`**:
  * 인메모리 전자지갑(`web3.eth.accounts.wallet`) 생성, 개인키 임포트 및 키 관리.
* **`web3_interface_transaction-scirpt.js`**:
  * 가스비(Gas Price, Gas Limit), Nonce 계산 및 원시 트랜잭션(`signTransaction` -> `sendSignedTransaction`) 서명/전송.
* **`web3_interface_provider-scirpt.js`**:
  * HTTP / WebSocket 프로바이더 설정 및 네트워크 상태(체인 ID, 최신 블록 넘버) 동기화.
* **`web3_interface_contract-scirpt.js`**:
  * ABI와 컨트랙트 주소를 결합하여 인스턴스를 생성하고, `call()`(조회) 및 `send()`(상태 변경) 트랜잭션 수행.

### 3. 하위 디렉토리
* **`abi/`**: OpenSea, ERC-721, ERC-721Metadata 표준 인터페이스 JSON ABI 보관.
* **`erc721_metadata/`**: IPFS에 업로드할 NFT 메타데이터 표준 JSON 예시(`name`, `description`, `image`, `attributes`).

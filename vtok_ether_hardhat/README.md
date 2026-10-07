# ⛓️ VTOK Ether Hardhat (스마트 컨트랙트 & Web3 개발 환경 상세 명세서)

이더리움 메인넷 및 EVM 호환 블록체인을 위한 **Hardhat 기반 Solidity 스마트 컨트랙트 개발, 배포, 테스팅 및 Web3.js 연동 프레임워크**입니다. OpenZeppelin 표준 상속 컨트랙트부터 순수 저수준 솔리디티 구현체, 대리 호출(`delegatecall`), 오프체인 서명 검증(`ecrecover`)에 이르는 스마트 컨트랙트 코어 엔진을 담당합니다.

---

## 📐 1. 모듈 전체 아키텍처 및 데이터 흐름 (Architecture Map)

```mermaid
flowchart TD
    subgraph Client ["💻 Web3 인터랙션 클라이언트 (scripts/examples/)"]
        direction LR
        DEPLOY["🚀 배포 스크립트
(example-erc721-deploy-script.js)"]
        WEB3_CLI["⚡ Web3.js 인터페이스
(Account / Wallet / Tx / Contract)"]
        SCANNER["🔍 블록 스캐너
(example-erc721-scanner-script.js)"]
    end

    subgraph Hardhat ["⚙️ Hardhat 런타임 환경 (HRE)"]
        direction LR
        CONFIG["🔧 hardhat.config.js
- Solidity 0.8.4
- Rinkeby / Localhost"]
        TASK["📋 Task Runner
(accounts / compile / test / node)"]
    end

    subgraph Contracts ["📜 스마트 컨트랙트 계층 (contracts/examples/)"]
        direction LR
        NFT_OZ["🎨 Example-erc721.sol
(OpenZeppelin 표준)"]
        NFT_RAW["🛠️ Example-erc721-raw.sol
(순수 솔리디티 구현)"]
        ERC20["💰 Example-erc20.sol
(Fungible Token)"]
        BALLOT["🗳️ Ballot.sol
(의결권 위임 투표)"]
        CORE["🧠 Example1~8.sol
(DelegateCall / ecrecover / Fallback)"]
    end

    subgraph Network ["🌐 EVM 블록체인 네트워크"]
        direction LR
        LOCAL["🖥️ Hardhat Local Node (8545)"]
        RINKEBY["🌐 Rinkeby Testnet (Infura RPC)"]
        IPFS["📦 IPFS (NFT.Storage 메타데이터)"]
    end

    Client --> CONFIG
    CONFIG --> TASK
    TASK --> Contracts
    Contracts --> LOCAL
    Contracts --> RINKEBY
    DEPLOY -.->|tokenURI 매핑| IPFS
```

---

## 🔄 2. NFT 배포 및 민팅 시퀀스 (NFT Deployment & Mint Pipeline)

```mermaid
sequenceDiagram
    autonumber
    actor Dev as 👨‍💻 배포자 / 개발자
    participant Script as 🚀 Deploy Script (Ethers.js)
    participant HRE as ⚙️ Hardhat 런타임
    participant Node as ⛓️ EVM 노드 (Local/Testnet)
    participant Contract as 📜 VtokNFT Contract
    participant IPFS as 📦 IPFS 분산 스토리지

    Dev->>Script: 1. npx hardhat run deploy-script 실행
    Script->>IPFS: 2. 메타데이터(JSON) 및 이미지 업로드
    IPFS-->>Script: 3. ipfs://Qm... 메타데이터 CID 반환
    Script->>HRE: 4. ethers.getContractFactory("VtokNFT")
    HRE->>Node: 5. 컨트랙트 생성 바이트코드 트랜잭션 전송
    Node->>Contract: 6. constructor() 실행 및 컨트랙트 배포
    Node-->>Script: 7. contract.address 확정
    Script->>Contract: 8. mintNFT(recipient, tokenURI)
    Contract->>Contract: 9. _safeMint() & _setTokenURI()
    Contract-->>Node: 10. Transfer(address(0), recipient, tokenId) 이벤트 방출
    Node-->>Dev: 11. 영수증 및 TokenId 출력 완료
```

---

## 📜 3. 스마트 컨트랙트 클래스 다이어그램 & 구조도

```mermaid
classDiagram
    class IERC721 {
        <<interface>>
        +balanceOf(owner) uint256
        +ownerOf(tokenId) address
        +safeTransferFrom(from, to, tokenId)
        +transferFrom(from, to, tokenId)
        +approve(to, tokenId)
        +getApproved(tokenId) address
        +setApprovalForAll(operator, approved)
        +isApprovedForAll(owner, operator) bool
    }

    class ExampleERC721 {
        -Counters.Counter _tokenIds
        +mintNFT(recipient, tokenURI) uint256
    }

    class ExampleERC721Raw {
        -_owners mapping(uint256 => address)
        -_balances mapping(address => uint256)
        -_tokenApprovals mapping(uint256 => address)
        -_operatorApprovals mapping(address => mapping(address => bool))
        +safeTransferFrom(from, to, tokenId)
        -_checkOnERC721Received() bool
    }

    class Ballot {
        +Chairperson address
        +voters mapping(address => Voter)
        +proposals Proposal[]
        +giveRightToVote(voter)
        +delegate(to)
        +vote(proposal)
        +winningProposal() uint
        +winnerName() bytes32
    }

    class SignatureVerifier {
        +getEthSignedMessageHash(messageHash) bytes32
        +verify(signer, message, v, r, s) bool
        +recoverSigner(ethSignedMessageHash, sig) address
    }

    IERC721 <|.. ExampleERC721
    IERC721 <|.. ExampleERC721Raw
```

---

## 📄 4. 솔리디티 컨트랙트 상세 함수 명세 (Contracts API Reference)

| 컨트랙트 파일명 | 함수명 (Method Signature) | 가시성 / 변경성 | 반환값 | 상세 기능 및 비즈니스 로직 |
| :--- | :--- | :---: | :---: | :--- |
| **`Example-erc721.sol`** | `mintNFT(address recipient, string memory tokenURI)` | `public` | `uint256` | TokenId 1 증가 ➔ 수신자에게 발행 ➔ IPFS 메타데이터 바인딩 |
| **`Example-erc721-raw.sol`** | `safeTransferFrom(address from, address to, uint256 tokenId)` | `public` | `void` | `onERC721Received` 매직 넘버(0x150b7a02) 수신 검증 후 소유권 안전 이전 |
| 〃 | `approve(address to, uint256 tokenId)` | `public` | `void` | 특정 토큰에 대한 1회성 전송 권한 위임 |
| 〃 | `setApprovalForAll(address operator, bool approved)` | `public` | `void` | 지갑 보유 전체 토큰에 대한 오퍼레이터(거래소 등) 권한 위임 |
| **`Example-erc20.sol`** | `transfer(address recipient, uint256 amount)` | `public` | `bool` | ERC-20 잔액 차감 및 수신자에게 송금 |
| **`Ballot.sol`** | `giveRightToVote(address voter)` | `public` | `void` | 의장(Chairperson)이 특정 주소에 투표권 가중치(`weight = 1`) 부여 |
| 〃 | `delegate(address to)` | `public` | `void` | 자신의 투표권을 다른 유권자 주소로 위임 (순환 참조 방지 루프 내장) |
| 〃 | `vote(uint proposal)` | `public` | `void` | 특정 제안에 가중치만큼 온체인 투표 집계 |
| **`Example5-fallback.sol`** | `receive() external payable` | `external payable` | `void` | 순수 ETH 송금 트랜잭션 자동 수신 핸들러 |
| 〃 | `fallback() external payable` | `external payable` | `void` | 정의되지 않은 함수 호출 트랩 및 데이터/이더 동시 수신 |
| **`Example5.sol`** | `delegatecall(bytes data)` | `public` | `bool` | 호출자의 스토리지 컨텍스트를 유지한 채 외부 컨트랙트 로직 실행 (프록시 패턴) |
| **`Example8.sol`** | `verify(address signer, string memory message, bytes memory sig)` | `public pure` | `bool` | `ecrecover`를 호출하여 서명 파라미터 `(v, r, s)`로부터 서명자 주소 검증 |

---

## ⚡ 5. Web3 스크립트 명세 (`scripts/examples/`)

| 스크립트 파일명 | 실행 명령어 | 주요 기능 |
| :--- | :--- | :--- |
| **`example-erc721-deploy-script.js`** | `npx hardhat run scripts/examples/example-erc721-deploy-script.js` | 컨트랙트 컴파일 및 로컬/테스트넷 배포 자동화 |
| **`example-erc721-scanner-script.js`** | `node scripts/examples/example-erc721-scanner-script.js` | 블록체인 노드를 폴링하여 `Transfer` 이벤트 실시간 수집 |
| **`web3_interface_account-scirpt.js`** | `node scripts/examples/web3_interface_account-scirpt.js` | Web3 키쌍 생성, 개인키 암호화 및 잔액 확인 |
| **`web3_interface_transaction-scirpt.js`** | `node scripts/examples/web3_interface_transaction-scirpt.js` | 가스 한도 계산, 트랜잭션 수동 서명 및 노드 전송 |
| **`web3_interface_contract-scirpt.js`** | `node scripts/examples/web3_interface_contract-scirpt.js` | ABI 기반 온체인 컨트랙트 함수 원격 실행 (`call` / `send`) |

---

## 🧪 6. 테스팅 및 명령어 가이드

```bash
# 1. 의존성 설치
npm install

# 2. 컨트랙트 컴파일
npx hardhat compile

# 3. 로컬 독립 블록체인 노드 실행 (포트 8545)
npx hardhat node

# 4. 전체 단위 테스트 (Mocha/Chai)
npx hardhat test

# 5. 로컬 네트워크 대상 배포
npx hardhat run scripts/examples/example-erc721-deploy-script.js --network localhost
```

# 🚀 VTOK-ALL 통합 모노레포 플랫폼 (VTOK Monorepo System Specification)

> [!IMPORTANT]
> **🤖 AI Agent 및 개발자를 위한 탐색 및 코드 수정 지침 (AI Agent & Developer Notice)**
> - 본 저장소는 VTOK(브이톡) NFT 웹 생태계 전체의 백엔드 API, 프론트엔드 어드민, 퍼블리싱 웹, 스마트 컨트랙트 연동 모듈 및 마켓플레이스가 통합된 모노레포입니다.
> - **AI Agent 또는 개발자는 소스 코드를 개별 파일 단위로 모두 읽어볼 필요 없이, 본 README 및 각 하위 프로젝트의 `README.md` 문서만 확인하면 데이터베이스 테이블 구조, API 엔드포인트 파라미터, 스마트 컨트랙트 ABI, 프론트엔드 컴포넌트 사양을 100% 구체적으로 파악할 수 있습니다.**

---

## 📐 1. 시스템 전체 아키텍처 및 데이터 흐름 (Architecture & Data Flow)

```mermaid
flowchart TD
    subgraph ClientLayer ["🖥️ Client Layer (Frontend Applications)"]
        PW["🌐 vtok_publishing_web/ClientApp\n(React 17 + MUI + SignalR Client)"]
        AF["📊 vtok_admin_frontend\n(React + MUI DataGrid Pro)"]
        ETH_TEST["⛓️ ethereum-transaction-test\n(React + Web3.js / Ethers.js)"]
        META_TMPL["🦊 Metamask-Template\n(React Boilerplate)"]
        SPINE_TEST["🎮 spine-player-test\n(React + Spine WebGL Player)"]
    end

    subgraph BackendLayer ["⚙️ Backend API Layer (.NET 6 / ASP.NET Core)"]
        WEB_BACKEND["vtok_publishing_web API\n(Controllers: MittingController, Hubs: ChatHub)"]
        MINT_BACKEND["vtok-minting API\n(Controllers: Mint, Token, Whitelist, Contract)"]
        SANDBOX_BACKEND["SandboxClone API\n(Controllers: Cart, NFT, NFTGroup, User)"]
        TEST_BACKEND["minting-test API\n(Controllers: EthereumController, MintController)"]
    end

    subgraph StorageLayer ["💾 Infrastructure & Database Layer"]
        REDIS[("⚡ Redis Cache (Port 6379)\n- Keys: minting:count:{round}\n- Realtime SignalR State")]
        MYSQL[("🗄️ MySQL Database (Port 3306)\n- Tables: SitinAddr, MittingAddr,\nWhitelists, Contracts, Tokens,\nKeyValues, Users, NFTGroup, CartItem")]
        IPFS["📦 IPFS / NFT.Storage\n- API: https://api.nft.storage/upload\n- Return: ipfs://{CID}"]
    end

    subgraph BlockchainLayer ["⛓️ Blockchain Network Layer"]
        RINKEBY["이더리움 / Klaytn 네트워크 (Rinkeby / Mainnet)\n- Smart Contract: ERC-721 / ERC-1155\n- Web3 Provider: Nethereum Web3"]
    end

    PW -->|HTTP REST & SignalR /chatHub| WEB_BACKEND
    AF -->|HTTP REST /api/get/category, /api/get/file| WEB_BACKEND
    ETH_TEST -->|window.ethereum / WalletConnect| RINKEBY

    WEB_BACKEND -->|StackExchange.Redis| REDIS
    WEB_BACKEND -->|EF Core ApiDataContext| MYSQL

    MINT_BACKEND -->|HTTP Bearer Auth| IPFS
    MINT_BACKEND -->|Nethereum ERC721MintFunction| RINKEBY
    MINT_BACKEND -->|EF Core ApplicationDbContext| MYSQL

    SANDBOX_BACKEND -->|EF Core ApplicationDbContext| MYSQL
```

---

## 🗄️ 2. 데이터베이스 테이블 스키마 총괄 (Database Schema Reference)

각 서비스에서 사용되는 MySQL 데이터베이스 테이블 및 칼럼 명세입니다.

### 2.1 `vtok_publishing_web` 데이터베이스 (`ApiDataContext`)
- **`SitinAddr` 테이블** (사전 등록/대기열 지갑 주소):
  | Column Name | Data Type | Key | Description |
  | :--- | :--- | :---: | :--- |
  | `Id` | `INT` | PK (Auto Increment) | 고유 레코드 식별자 |
  | `Addr` | `VARCHAR(255)` | - | 신청자 이더리움/지갑 주소 (`0x...`) |
  | `Count` | `INT` | - | 신청한 민팅 수량 |
  | `Date` | `VARCHAR(50)` | - | 등록 일시 (`yyyy-MM-dd-HH-mm-ss`) |

- **`MittingAddr` 테이블** (최종 민팅 트랜잭션 수락 주소):
  | Column Name | Data Type | Key | Description |
  | :--- | :--- | :---: | :--- |
  | `Id` | `INT` | PK (Auto Increment) | 고유 레코드 식별자 |
  | `Addr` | `VARCHAR(255)` | - | 민팅 지갑 주소 |
  | `Tx_id` | `VARCHAR(255)` | - | 블록체인 트랜잭션 해시 (Transaction Hash) |
  | `Value` | `VARCHAR(50)` | - | 지불된 암호화폐 금액 (ETH / KLAY) |
  | `Count` | `INT` | - | 승인된 민팅 수량 |
  | `Round` | `INT` | - | 민팅 진행 회차 (1차, 2차 등) |
  | `Date` | `VARCHAR(50)` | - | 승인 완료 일시 |

### 2.2 `vtok-minting` 데이터베이스 (`ApplicationDbContext`)
- **`Tokens` 테이블** (발급된 NFT 토큰 복합 키):
  | Column Name | Data Type | Key | Description |
  | :--- | :--- | :---: | :--- |
  | `Contract` | `VARCHAR(255)` | PK (Order 1) | 스마트 컨트랙트 계약 주소 |
  | `Id` | `INT` | PK (Order 2) | 온체인 토큰 ID (Token ID) |
  | `CreatedDate` | `DATETIME` | - | 토큰 생성이력 일시 |
  | `Receiver` | `VARCHAR(255)` | NULL | 수령인 지갑 주소 |
  | `Received` | `TINYINT(1)` | - | 수령 완료 여부 (Boolean) |

- **`Contracts` 테이블** (등록된 스마트 컨트랙트):
  | Column Name | Data Type | Key | Description |
  | :--- | :--- | :---: | :--- |
  | `Address` | `VARCHAR(255)` | PK | 스마트 컨트랙트 배포 주소 |
  | `CreatedDate` | `DATETIME` | - | 등록 일시 |

- **`Whitelists` 테이블** (화이트리스트 참가자):
  | Column Name | Data Type | Key | Description |
  | :--- | :--- | :---: | :--- |
  | `Address` | `VARCHAR(255)` | PK | 지갑 주소 |
  | `Quantity` | `INT` | - | 허용된 최대 민팅 수량 |
  | `CreatedDate` | `DATETIME` | - | 등록 일시 |

- **`KeyValues` 테이블** (시스템 설정 키-값 저장소):
  | Column Name | Data Type | Key | Description |
  | :--- | :--- | :---: | :--- |
  | `Key` | `VARCHAR(255)` | PK | 설정 키 (예: `price`, `minting_state`) |
  | `Value` | `VARCHAR(255)` | - | 설정 값 |

### 2.3 `SandboxClone` 데이터베이스 (`ApplicationDbContext`)
- **`User`**: `UserId` (PK), `Name`, `Email`, `CreatedDateTime`
- **`NFTGroup`**: `GroupId` (PK), `Name`, `Creator` (FK -> User), `Description`
- **`NFT`**: `TokenId` (PK), `Group` (FK -> NFTGroup), `Owner` (FK -> User), `Price` (float), `OnSale` (bool)
- **`CartItem`**: `CartOwner` (PK1), `Group` (PK2), `Quantity` (int)

---

## 🔌 3. 주요 API 엔드포인트 총괄 명세 (API Catalog)

### 3.1 `vtok_publishing_web` Web API (`ApiControllers/MittingController.cs`)
- `GET /api/time`: 현재 라운드 및 남은 시간 조회 (`Time` 객체 반환)
- `GET /api/mitting`: 민팅 라운드 정보 및 일정 반환
- `GET /api/result`: 민팅 결과 목록 조회
- `GET /api/addr/{id}`: 지갑 주소 (`id`) 검증 결과 반환
- `GET /api/count/{round}`: 특정 라운드의 현재 민팅 수량 카운트 반환 및 SignalR `Receive("Count", cnt)` 브로드캐스트
- `POST /api/sitin/{id}`: Body `SitinDto` (`{ Addr, Count }`) 신청 수신
- `POST /api/approval/{id}`: Body `MittingDto` (`{ Addr, Tx_id, Value, Count, Round }`) 민팅 승인 및 수량 차감

### 3.2 `vtok-minting` Web API (`Controllers/`)
- `POST /Mint`: Body `NFTMeta` JSON 데이터 수신 -> IPFS 업로드 -> Nethereum 스마트 컨트랙트 `mint(contractAddress, ipfsUrl)` 실행 후 DB 저장
- `GET /Token`: 전체 토큰 내역 반환
- `POST /Token?contractAddress={addr}&tokenId={id}`: 토큰 추가
- `DELETE /Token?contractAddress={addr}&tokenId={id}`: 토큰 삭제
- `GET /Whitelist`, `POST /Whitelist`: 화이트리스트 주소 등록 및 조회
- `GET /Contract`: 등록된 컨트랙트 정보 반환

---

## 🛠️ 4. 스마트 컨트랙트 연동 사양 (`Constants.cs` & Nethereum)

- **RPC Endpoint**: `https://rinkeby.infura.io/v3/1345b6747e0d4aa0ac47166f5128a4d6`
- **Target Network**: Ethereum Rinkeby Testnet (`Chain.Rinkeby`)
- **IPFS Pinning API**: `https://api.nft.storage/upload` (`Bearer {ipfsApiKey}`)
- **Solidity Function Mapping DTOs**:
  - `ERC721MintFunction`: `[Function("mint")] public string TokenURI { get; set; }`
  - `ERC721OwnerOfFunction`: `[Function("ownerOf")] public BigInteger TokenId { get; set; }`
  - `ERC721ContractOwnerFunction`: `[Function("owner")]`
  - `ERC721MintEventDto`: `[Event("Transfer")]` -> `TokenId` 디코딩 추출

---

## 📂 5. 프로젝트 카탈로그 & 하위 README 링크

| 디렉토리 명 | 설명 및 스택 | 하위 README |
| :--- | :--- | :---: |
| 🌐 [**vtok_publishing_web**](./vtok_publishing_web) | VTOK 메인 웹사이트 & SignalR 실시간 민팅 현황 | [바로가기](./vtok_publishing_web/README.md) \| [ClientApp](./vtok_publishing_web/ClientApp/README.md) |
| 📊 [**vtok_admin_frontend**](./vtok_admin_frontend) | VTOK 관리자 백오피스 (카테고리 트리 & 파일 이력) | [바로가기](./vtok_admin_frontend/README.md) \| [src](./vtok_admin_frontend/src/README.md) |
| ⛏️ [**vtok-minting**](./vtok-minting) | NFT 코어 민팅 엔진 (IPFS + Nethereum Web3) | [바로가기](./vtok-minting/README.md) \| [MainApp](./vtok-minting/MainApplication/README.md) |
| 🧪 [**minting-test**](./minting-test) | ERC-721 / ERC-1155 스마트 컨트랙트 테스트 API | [바로가기](./minting-test/README.md) \| [MintingTest](./minting-test/MintingTest/README.md) |
| ⛓️ [**ethereum-transaction-test**](./ethereum-transaction-test) | 이더리움 잔액 조회 & ERC-20/721 전송 클라이언트 | [바로가기](./ethereum-transaction-test/README.md) \| [src](./ethereum-transaction-test/src/README.md) |
| 🦊 [**Metamask-Template**](./Metamask-Template) | React용 MetaMask 지갑 연결 & 이벤트 템플릿 | [바로가기](./Metamask-Template/README.md) \| [src](./Metamask-Template/src/README.md) |
| 🎮 [**spine-player-test**](./spine-player-test) | Spine 2D 캐릭터 WebGL 플레이어 테스트 | [바로가기](./spine-player-test/README.md) \| [src](./spine-player-test/src/README.md) |
| 📦 [**SandboxClone**](./SandboxClone) | 더 샌드박스 스타일 마켓플레이스 백엔드 API | [바로가기](./SandboxClone/README.md) \| [MainApp](./SandboxClone/MainApplication/README.md) |
| 💻 [**ASPClone**](./ASPClone) | ASP.NET Core Web API 기초 패턴 실습 | [바로가기](./ASPClone/README.md) \| [ASPPractice](./ASPClone/ASPPractice/README.md) |
| 📘 [**CSharpPractice**](./CSharpPractice) | C# 알고리즘 (BFS, DFS) 및 자료구조 코드 | [바로가기](./CSharpPractice/README.md) \| [CSharpPractice](./CSharpPractice/CSharpPractice/README.md) |
| 🐹 [**go_practice**](./go_practice) | Go (Golang) 백엔드 기초 예제 | [바로가기](./go_practice/README.md) \| [src](./go_practice/src/README.md) |
| 🐍 [**python_rest_api_practice**](./python_rest_api_practice) | Python Flask REST API & Producer/Consumer | [바로가기](./python_rest_api_practice/README.md) |

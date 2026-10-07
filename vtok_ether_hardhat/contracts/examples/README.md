# 📜 Contracts Examples - 실무 솔리디티 스마트 컨트랙트 컬렉션

이더리움 및 Klaytn 호환 스마트 컨트랙트 구현체 모음으로, 표준 토큰 규격(ERC-721, ERC-20)부터 EVM 메모리/스토리지 최적화, 저수준 어셈블리 및 암호학적 서명 검증 로직을 포함합니다.

---

## 📄 컨트랙트별 상세 명세

### 1. 표준 토큰 및 NFT 컨트랙트
* **`Example-erc721.sol`**:
  * OpenZeppelin의 `ERC721URIStorage` 및 `Ownable`을 상속한 표준 NFT 컨트랙트.
  * `mintNFT(address recipient, string memory tokenURI)`: 신규 NFT 민팅, TokenId 자동 증가(`Counters.Counter`) 및 IPFS 메타데이터 URI 바인딩.
* **`Example-erc721-raw.sol`**:
  * 외부 라이브러리(OpenZeppelin) 의존성 없이 순수 솔리디티로 `IERC721`, `IERC721Metadata`, `IERC165` 표준 인터페이스를 직접 구현한 교육용 로우레벨 컨트랙트.
  * 소유권 매핑(`_owners`), 잔액 매핑(`_balances`), 오퍼레이터 승인 매핑(`_operatorApprovals`) 및 `safeTransferFrom`의 `onERC721Received` 매직 넘버 검증 로직 자체 내장.
* **`Example-erc20.sol`**:
  * OpenZeppelin `ERC20`을 상속한 기본 Fungible Token 발행 컨트랙트.
* **`Example-erc1155.sol`**:
  * 다중 토큰 표준(ERC-1155) 멀티 에셋 발행 인터페이스 파일.

### 2. 가버넌스 및 시스템 컨트랙트
* **`Ballot.sol`**:
  * 제안(Proposals) 투표 및 의결권 위임(`delegate`) 기능이 구현된 온체인 거버넌스 투표 시스템.
  * 의결권 가중치(`weight`), 투표 여부(`voted`), 위임 대상(`delegate`) 추적.
* **`Greeter.sol`**:
  * Hardhat 기본 스타터 컨트랙트로 인사말(`greeting`) 상태 변수 읽기/쓰기 및 `console.log` 디버깅 시연.

### 3. EVM 고급 기능 및 저수준 메커니즘
* **`Example1.sol` ~ `Example4.sol`**:
  * 변수 스코프(`storage`, `memory`, `calldata`), 함수 가시성(`public`, `external`, `internal`, `private`), 상속 및 다형성(Shadowing/Virtual/Override) 실습.
* **`Example5-fallback.sol` & `Example5.sol`**:
  * `receive() external payable`: 순수 이더 송금 처리 핸들러.
  * `fallback() external payable`: 일치하는 함수 시그니처가 없거나 데이터가 동반된 트랜잭션 수신 핸들러.
  * `delegatecall`: 호출자 컨텍스트(`msg.sender`, `msg.value`)와 스토리지를 유지하면서 외부 라이브러리/컨트랙트 코드를 실행하는 프록시 패턴 핵심 메커니즘.
* **`Example6.sol` ~ `Example7.sol`**:
  * 라이브러리(`SafeMath`, `ArrayLib`) 사용법 및 `using A for B` 문법 실습.
* **`Example8.sol`**:
  * `keccak256` 해시 생성 및 서명 검증(`ecrecover`): 개인키로 서명된 메시지 해시와 `(r, s, v)` 서명 파라미터로부터 서명자 공개 주소를 역산하여 온체인 신원 검증 수행.

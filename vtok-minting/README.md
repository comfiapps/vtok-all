# ⛏️ VTOK Minting Backend (NFT 민팅 & 메타데이터 API 명세서)

VTOK 코어 시스템의 NFT 민팅, IPFS 메타데이터 업로드, 스마트 컨트랙트 트랜잭션 전송 및 화이트리스트 검증을 담당하는 백엔드 엔진 서비스입니다.

---

## 🗄️ 데이터베이스 스키마 상세 (`ApplicationDbContext`)

1. **`Contracts` 테이블**:
   - `Address` (`VARCHAR(255)`, Primary Key): 배포된 스마트 컨트랙트 주소
   - `CreatedDate` (`DATETIME`): 등록일시

2. **`Tokens` 테이블**:
   - `Contract` (`VARCHAR(255)`, Primary Key Order 1): 컨트랙트 주소
   - `Id` (`INT`, Primary Key Order 2): 온체인 토큰 ID
   - `CreatedDate` (`DATETIME`): 생성일시
   - `Receiver` (`VARCHAR(255)`, Nullable): 수령인 지갑 주소
   - `Received` (`TINYINT(1)`): 수령 여부

3. **`Whitelists` 테이블**:
   - `Address` (`VARCHAR(255)`, Primary Key): 지갑 주소
   - `Quantity` (`INT`, Required): 허용 민팅 개수
   - `CreatedDate` (`DATETIME`): 등록일시

4. **`KeyValues` 테이블**:
   - `Key` (`VARCHAR(255)`, Primary Key): 설정 키 (`price` 등)
   - `Value` (`VARCHAR(255)`): 설정 값

---

## ⚙️ 하드코딩 환경 설정 (`Context/Constants.cs`)

- **이더리움 RPC 엔드포인트**: `https://rinkeby.infura.io/v3/1345b6747e0d4aa0ac47166f5128a4d6`
- **체인 네트워크**: `Nethereum.Signer.Chain.Rinkeby`
- **발송자 공개키**: `0x0F623575D3722d89126435b8D33363F1a8589252`
- **발송자 개인이더리움 키**: `c7eb5dc3d0a2f4d440676f8fa4452dc247722e5e661474b73d24a0103c29421c`
- **IPFS API URL**: `https://api.nft.storage/upload`
- **IPFS Bearer Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (`nft.storage` JWT)

---

## 🔌 컨트롤러 및 API 엔드포인트 명세

### 1. `MintController` (`[Route("[Controller]")]`)
- **`POST /Mint`**
  - Query Params: `contractAddress` (string), `quantity` (int, default=1)
  - Body: `NFTMeta` JSON 객체
  - 처리 흐름:
    1. `IPFSFunction.UploadToNFTStorage(data)` ➔ IPFS CID 생성 (`https://{CID}.ipfs.dweb.link`)
    2. `Web3Functions.MintERC721(contract, url)` ➔ Nethereum `ERC721MintFunction` 트랜잭션 전송 및 마이닝 영수증 이벤트 `ERC721MintEventDto` 수신
    3. `_tokenRepository.Insert(contract, tokenId)` ➔ DB 저장

### 2. `TokenController` (`[Route("[Controller]")]`)
- **`GET /Token`**: 전체 토큰 배열 반환 (`ActionResult<List<Token>>`)
- **`POST /Token`**: Params `contractAddress` (string), `tokenId` (int) ➔ DB 직접 등록
- **`DELETE /Token`**: Params `contractAddress` (string), `tokenId` (int) ➔ DB 삭제

- **[MainApplication README 바로가기](./MainApplication/README.md)**: 소스 레이어 상세 안내.

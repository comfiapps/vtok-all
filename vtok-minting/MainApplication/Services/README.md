# 📂 Services - 민팅 비즈니스 서비스 명세

`vtok-minting` 프로젝트의 비즈니스 서비스 로직 계층입니다.

---

## 📄 파일 명세

- **`MintService.cs`**:
  - `CreateToken(contract, data, quantity)`: `NFTMeta` JSON 직렬화 ➔ `IPFSFunction.UploadToNFTStorage` 호출 ➔ `Web3Functions.MintERC721` ➔ `TokenRepository.Insert`.
  - `Mint(address)`: 민팅 시간/수량/가격 검증 후 리저브 할당.
- **`TokenService.cs`**: 토큰 데이터베이스 조회 및 조작.
- **`WhitelistService.cs`**: 화이트리스트 계정 권한 확인.
- **`ContractService.cs`**: 스마트 컨트랙트 배포 주소 및 상태 검증.
- **`CommonService.cs`**: 민팅 시작/종료 여부 체크.
- **`ControlService.cs`**: 시스템 키-값 세팅 제어.

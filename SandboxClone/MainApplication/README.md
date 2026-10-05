# 📂 SandboxClone - `MainApplication` 상세 구성

- **`Controllers/`**
  - `NFTGroupController.cs`: NFT 컬렉션/그룹 조회 및 등록 컨트롤러.
  - `NFTController.cs`: 낱개 NFT 아이템 상세 정보 및 메타데이터 API.
  - `CartController.cs`: 유저 장바구니 담기, 수량 변경, 삭제 API.
  - `UserController.cs`: 지갑 계정 기반 사용자 회원가입 및 프로필 API.

- **`Services/`**
  - `NFTGroupService.cs` / `NFTService.cs`: 마켓플레이스 상품 카탈로그 서비스.
  - `CartService.cs` / `UserService.cs`: 구매 상태 및 유저 세션 관리 서비스.

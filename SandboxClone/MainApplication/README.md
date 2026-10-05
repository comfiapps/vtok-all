# 📂 SandboxClone - `MainApplication` API 및 C# 코드 명세

### 1. `Controllers/CartController.cs` & `Services/CartService.cs`
- `GET /api/Cart/{userId}`: `_cartService.GetCartItems(userId)` 호출 ➔ 장바구니 항목 리스트 반환.
- `POST /api/Cart`: `_cartService.AddToCart(cartItem)` 호출 ➔ 수량 추가 또는 신규 생성.
- `DELETE /api/Cart/{userId}/{groupId}`: `_cartService.RemoveFromCart(userId, groupId)` 호출 ➔ 장바구니 항목 삭제.

### 2. `Controllers/NFTGroupController.cs` & `Services/NFTGroupService.cs`
- `GET /api/NFTGroup`: 마켓플레이스 컬렉션 리스트 전체 반환.
- `GET /api/NFTGroup/{id}`: 특정 그룹 정보 반환.
- `POST /api/NFTGroup`: Body `NFTGroupSub` ➔ 그룹 생성.

### 3. `Controllers/NFTController.cs` & `Services/NFTService.cs`
- `GET /api/NFT/{id}`: 특정 TokenId의 NFT 정보 및 판매 상태(`OnSale`), 가격(`Price`) 반환.
- `POST /api/NFT`: 신규 NFT 낱개 아이템 등록.

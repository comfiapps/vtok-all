# 🗄️ Context - 샌드박스 마켓플레이스 데이터 컨텍스트

더 샌드박스(The Sandbox) 스타일의 가상 복셀 에셋 마켓플레이스를 위한 Entity Framework Core DB 컨텍스트입니다.

* **`SandboxContext.cs`**:
  * `DbSet<User>`: 마켓플레이스 회원 및 크리에이터 계정 테이블.
  * `DbSet<NFTGroup>`: 에셋 컬렉션 그룹(아이템 카테고리) 테이블.
  * `DbSet<NFT>`: 개별 NFT 토큰 정보, 가격, 판매 여부 테이블.
  * `DbSet<CartItem>`: 사용자 장바구니 품목 복합키 테이블.

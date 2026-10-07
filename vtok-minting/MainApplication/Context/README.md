# 🗄️ Context - Entity Framework Core 데이터베이스 컨텍스트

MySQL RDBMS와 연결되어 민팅 이력, 화이트리스트 주소, 토큰 메타데이터 엔티티의 영속성을 보장하는 EF Core DbContext입니다.

* **`MintingContext.cs`**:
  * `DbSet<WhitelistAddr>`: 사전 등록된 화이트리스트 사용자 매핑 테이블.
  * `DbSet<Token>`: 발행된 NFT 토큰 ID, 소유자 및 메타데이터 IPFS 해시 테이블.

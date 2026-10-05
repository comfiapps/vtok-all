# 📂 Models - 도메인 모델 엔티티 명세

---

## 📄 파일 명세

- **`User.cs`**: `UserId` (PK), `Name`, `Email`, `CreatedDateTime`
- **`NFTGroup.cs`**: `GroupId` (PK), `Name`, `Creator` (FK -> User), `Description`
- **`NFT.cs`**: `TokenId` (PK), `Group` (FK -> NFTGroup), `Owner` (FK -> User), `Price`, `OnSale`
- **`CartItem.cs`**: `CartOwner` (PK1), `Group` (PK2), `Quantity`

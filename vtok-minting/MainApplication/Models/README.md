# 📂 Models - 데이터베이스 엔티티 명세

`vtok-minting` 서비스의 Entity Framework Core 엔티티 객체 디렉토리입니다.

---

## 📄 파일 명세

- **`Token.cs`**: `Contract` (PK1), `Id` (PK2), `CreatedDate`, `Receiver`, `Received`.
- **`Contract.cs`**: `Address` (PK), `CreatedDate`.
- **`Whitelist.cs`**: `Address` (PK), `Quantity`, `CreatedDate`.
- **`KeyValue.cs`**: `Key` (PK), `Value`.

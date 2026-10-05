# 📦 SandboxClone (더 샌드박스 마켓플레이스 백엔드 API 명세서)

더 샌드박스(The Sandbox) 마켓플레이스의 데이터 모델 및 백엔드 API 아키텍처를 벤치마크하여 개발한 백엔드 서비스입니다.

---

## 📐 1. 모듈 내부 상세 아키텍처 (Detailed Module Architecture)

```mermaid
flowchart TD
    subgraph Client ["🖥️ HTTP Client Requests"]
        C_REQ["Cart API Requests\n(GET/POST/DELETE /api/Cart)"]
        G_REQ["NFTGroup API Requests\n(GET/POST /api/NFTGroup)"]
        N_REQ["NFT API Requests\n(GET/POST /api/NFT)"]
        U_REQ["User API Requests\n(GET/POST /api/User)"]
    end

    subgraph Controller ["⚙️ Controller Layer (.NET Core)"]
        CART_C["🛒 CartController\n(Cart Item Operations)"]
        NFTG_C["📦 NFTGroupController\n(Collection Management)"]
        NFT_C["🎨 NFTController\n(Voxel Item Operations)"]
        USER_C["👤 UserController\n(Account Profile)"]
    end

    subgraph Business ["🧠 Service & Business Logic Layer"]
        CART_S["CartService\n- AddToCart, RemoveFromCart\n- Quantity Calculation"]
        NFTG_S["NFTGroupService\n- Create Group, List Collections"]
        NFT_S["NFTService\n- Token Price & OnSale Status"]
        USER_S["UserService\n- Account Registration & Profile"]
    end

    subgraph Data ["🗄️ ORM & Database Layer"]
        DBC["⚡ ApplicationDbContext (EF Core)\n- Change Tracker & Entity State"]
        
        subgraph Entities ["Entities & Schema"]
            U_TBL[("User Table\n- UserId (PK)\n- Name, Email")]
            G_TBL[("NFTGroup Table\n- GroupId (PK)\n- Creator FK -> User")]
            N_TBL[("NFT Table\n- TokenId (PK)\n- Group FK, Owner FK\n- Price, OnSale")]
            C_TBL[("CartItem Table\n- CartOwner (PK1)\n- Group (PK2)\n- Quantity")]
        end
    end

    C_REQ --> CART_C
    G_REQ --> NFTG_C
    N_REQ --> NFT_C
    U_REQ --> USER_C

    CART_C --> CART_S
    NFTG_C --> NFTG_S
    NFT_C --> NFT_S
    USER_C --> USER_S

    CART_S --> DBC
    NFTG_S --> DBC
    NFT_S --> DBC
    USER_S --> DBC

    DBC --> U_TBL
    DBC --> G_TBL
    DBC --> N_TBL
    DBC --> C_TBL
    G_TBL -->|1:N FK| U_TBL
    N_TBL -->|1:N FK| G_TBL
    N_TBL -->|1:N FK| U_TBL
```

---

## 🗄️ 데이터베이스 엔티티 상세 스키마 (`ApplicationDbContext`)

1. **`User` 테이블** (사용자):
   - `UserId` (`INT`, Primary Key, Auto Increment)
   - `Name` (`VARCHAR(255)`, Required)
   - `Email` (`VARCHAR(255)`, Required)
   - `CreatedDateTime` (`DATETIME`): 생성일시

2. **`NFTGroup` 테이블** (컬렉션/그룹):
   - `GroupId` (`INT`, Primary Key, Auto Increment)
   - `Name` (`VARCHAR(255)`, Required)
   - `Creator` (`User` 엔티티, Required FK)
   - `Description` (`VARCHAR(255)`)

3. **`NFT` 테이블** (개별 복셀/3D 토큰 아이템):
   - `TokenId` (`INT`, Primary Key)
   - `Group` (`NFTGroup` 엔티티, Required FK)
   - `Owner` (`User` 엔티티, Required FK)
   - `Price` (`FLOAT`)
   - `OnSale` (`BOOLEAN`, Required)

4. **`CartItem` 테이블** (장바구니):
   - `CartOwner` (`INT`, Primary Key Order 1): 유저 ID
   - `Group` (`INT`, Primary Key Order 2): NFT 그룹 ID
   - `Quantity` (`INT`): 수량

---

## 📂 하위 README 링크
- **[MainApplication README 바로가기](./MainApplication/README.md)**: 컨트롤러 및 서비스 명세.

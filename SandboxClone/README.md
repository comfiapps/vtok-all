# 📦 SandboxClone (더 샌드박스 마켓플레이스 백엔드 API)

메타버스 블록체인 게임 '더 샌드박스(The Sandbox)' 마켓플레이스의 백엔드 도메인 구조를 모델링한 백엔드 API 서비스 프로젝트입니다.  
NFT 그룹(컬렉션), 개별 NFT 아이템, 사용자 프로필 및 장바구니(Shopping Cart) 관리 기능을 제공합니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Framework**: C# (.NET 6.0 / ASP.NET Core Web API)
- **Database**: MySQL / MariaDB (Entity Framework Core 6)

---

## 📂 디렉토리 구조 (Directory Structure)

```text
SandboxClone/
└── MainApplication/       # 백엔드 API 구현 프로젝트 디렉토리 (상세 설명은 하위 README)
    ├── Context/           # EF Core Database Context (ApplicationDbContext)
    ├── Controllers/       # CartController, NFTController, NFTGroupController, UserController
    ├── Migrations/        # EF Core DB 마이그레이션 파일
    ├── Models/            # CartItem, NFT, NFTGroup, User 엔티티
    ├── PreModels/         # 요청/응답 변환 모델 (CartItemSub, NFTGroupSub, UserSub)
    └── Services/          # CartService, NFTGroupService, NFTService, UserService
```

- **[MainApplication README 바로가기](./MainApplication/README.md)**: 소스 엔티티 및 API 명세.

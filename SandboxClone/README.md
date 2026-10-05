# 📦 SandboxClone (더 샌드박스 마켓플레이스 백엔드)

더 샌드박스(The Sandbox) 마켓플레이스의 백엔드 서비스 아키텍처를 벤치마크하여 구현한 NFT 그룹, 장바구니(Cart), 사용자 관리 백엔드 API입니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Framework**: C# (.NET 6.0 / ASP.NET Core Web API)
- **Database**: MySQL / MariaDB (Entity Framework Core)

---

## 📂 디렉토리 구조 (Directory Structure)

```text
SandboxClone/
└── MainApplication/       # 백엔드 API 서비스 프로젝트
    ├── Context/           # ApplicationDbContext
    ├── Controllers/       # CartController, NFTController, NFTGroupController, UserController
    ├── Models/            # CartItem, NFT, NFTGroup, User 엔티티
    ├── PreModels/         # 요청/응답 변환 모델
    └── Services/          # 비즈니스 서비스 레이어
```

- **[MainApplication README 바로가기](./MainApplication/README.md)**: 소스 구성 세부설명.

# ⛏️ VTOK Minting Backend (NFT 민팅 & 메타데이터 API)

VTOK 플랫폼의 코어 NFT 민팅 및 IPFS 분산 메타데이터 관리 API 서비스입니다.  
ASP.NET Core 6.0 및 Nethereum 라이브러리를 활용하여 블록체인 스마트 컨트랙트 트랜잭션 발송, 토큰 발급, 화이트리스트 검증을 수행합니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Framework**: C# (.NET 6.0 / ASP.NET Core Web API)
- **Web3 Library**: Nethereum (Ethereum / Klaytn Web3 C# SDK)
- **Storage & DB**: MySQL / MariaDB (EF Core 6), IPFS (InterPlanetary File System Pinning API)

---

## 📂 디렉토리 구조 (Directory Structure)

```text
vtok-minting/
└── MainApplication/       # 백엔드 코어 Web API 프로젝트 디렉토리
    ├── Context/           # EF Core Database Context (ApplicationDbContext)
    ├── Controllers/       # API 컨트롤러 (Mint, Token, Whitelist, Contract)
    ├── Dtos/              # IPFS 및 NFT 메타데이터 DTO
    ├── Migrations/        # EF Core DB 마이그레이션 파일
    ├── Models/            # DB 테이블 엔티티 (Contract, Token, Whitelist)
    ├── Repositories/      # DB 액세스 데이터 리포지토리 레이어
    ├── Services/          # 민팅, 스마트 컨트랙트, IPFS 비즈니스 서비스
    └── Utils/             # Nethereum 스마트 컨트랙트 함수 객체 & IPFS 연동 유틸리티
```

- **[MainApplication README 바로가기](./MainApplication/README.md)**: 소스 코드 레이어별 역할 안내.

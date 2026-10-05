# 🧪 Minting Test (NFT 민팅 & 스마트 컨트랙트 테스트 API)

이더리움 및 Klaytn 호환 블록체인에서 ERC-721(NFT) 및 ERC-1155(Multi-Token) 토큰 전송과 민팅 기능 및 가스비 한도를 테스트하기 위한 백엔드 Web API입니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Framework**: C# (.NET 6.0 / ASP.NET Core Web API)
- **Web3 Library**: Nethereum (Ethereum / EVM C# SDK)
- **Database**: MySQL (EF Core 6)

---

## 📂 디렉토리 구조 (Directory Structure)

```text
minting-test/
└── MintingTest/           # 테스트 백엔드 Web API 프로젝트
    ├── Context/           # ApplicationDbContext
    ├── ContractFunctions/ # ERC-721 및 ERC-1155 스마트 컨트랙트 ABI 매핑 클래스
    ├── Controllers/       # EthereumController, MintController
    ├── Migrations/        # EF Core DB 마이그레이션
    ├── Models/            # Whitelist 엔티티
    ├── Repositories/      # WhitelistRepository
    └── Services/          # EthereumService, WhitelistService
```

- **[MintingTest README 바로가기](./MintingTest/README.md)**: 소스 구성 및 Nethereum ABI 함수 안내.

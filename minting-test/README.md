# 🧪 Minting Test (NFT 민팅 테스트 API)

ERC-721 및 ERC-1155 스마트 컨트랙트 표준의 민팅 및 토큰 전송(Transfer)을 테스트하기 위한 백엔드 API 서비스입니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Framework**: C# (.NET 6.0 / ASP.NET Core Web API)
- **Web3 Library**: Nethereum
- **Database**: MySQL (EF Core 6)

---

## 📂 디렉토리 구조 (Directory Structure)

```text
minting-test/
└── MintingTest/           # 백엔드 테스트 API 프로젝트
    ├── Context/           # DB Context
    ├── ContractFunctions/ # ERC-721 / ERC-1155 Nethereum 함수 객체
    ├── Controllers/       # EthereumController, MintController
    ├── Repositories/      # WhitelistRepository
    └── Services/          # EthereumService, WhitelistService
```

- **[MintingTest README 바로가기](./MintingTest/README.md)**: MintingTest 프로젝트 상세 안내.

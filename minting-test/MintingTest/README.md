# 📂 MintingTest - Nethereum Contract Functions 명세

스마트 컨트랙트 ABI 전송 함수 DTO 클래스 및 서비스 명세입니다.

---

## 🛠️ Nethereum Contract Function DTOs

### 1. `ContractFunctions/ERC721TransferFunction.cs`
```csharp
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;
using System.Numerics;

namespace MintingTest.ContractFunctions
{
    [Function("safeTransferFrom")]
    public class ERC721TransferFunction : FunctionMessage
    {
        [Parameter("address", "_from", 1)] public string From { get; set; }
        [Parameter("address", "_to", 2)] public string To { get; set; }
        [Parameter("uint256", "_tokenId", 3)] public BigInteger TokenId { get; set; }
    }
}
```

### 2. `ContractFunctions/ERC1155TransferFunction.cs`
```csharp
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;
using System.Collections.Generic;
using System.Numerics;

namespace MintingTest.ContractFunctions
{
    [Function("safeBatchTransferFrom")]
    public class ERC1155TransferFunction : FunctionMessage
    {
        [Parameter("address", "_from", 1)] public string From { get; set; }
        [Parameter("address", "_to", 2)] public string To { get; set; }
        [Parameter("uint256[]", "_ids", 3)] public List<BigInteger> Ids { get; set; }
        [Parameter("uint256[]", "_amounts", 4)] public List<BigInteger> Amounts { get; set; }
        [Parameter("bytes", "_data", 5)] public byte[] Data { get; set; }
    }
}
```

---

## 🔌 `Controllers/EthereumController.cs` API 명세
- `GET /api/ethereum/gasprice`: 네트워크 현재 가스 가격(Wei 및 Gwei) 조회.
- `POST /api/ethereum/transfer721`: ERC-721 단일 NFT 소유권 이전 트랜잭션 수신.
- `POST /api/ethereum/transfer1155`: ERC-1155 수량 기반 배치 NFT 소유권 이전 트랜잭션 수신.

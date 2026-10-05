# 📂 MintingTest - Nethereum Contract Functions 명세

### 1. `ContractFunctions/ERC721TransferFunction.cs`
```csharp
[Function("safeTransferFrom")]
public class ERC721TransferFunction : FunctionMessage
{
    [Parameter("address", "_from", 1)] public string From { get; set; }
    [Parameter("address", "_to", 2)] public string To { get; set; }
    [Parameter("uint256", "_tokenId", 3)] public BigInteger TokenId { get; set; }
}
```

### 2. `ContractFunctions/ERC1155TransferFunction.cs`
```csharp
[Function("safeBatchTransferFrom")]
public class ERC1155TransferFunction : FunctionMessage
{
    [Parameter("address", "_from", 1)] public string From { get; set; }
    [Parameter("address", "_to", 2)] public string To { get; set; }
    [Parameter("uint256[]", "_ids", 3)] public List<BigInteger> Ids { get; set; }
    [Parameter("uint256[]", "_amounts", 4)] public List<BigInteger> Amounts { get; set; }
    [Parameter("bytes", "_data", 5)] public byte[] Data { get; set; }
}
```

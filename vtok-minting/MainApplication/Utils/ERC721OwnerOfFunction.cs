using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;

using System.Numerics;

[Function("ownerOf", "address")]
public class ERC721OwnerOfFunction : FunctionMessage
{
    [Parameter("uint256", "tokenId", 1)]
    public BigInteger TokenId { get; set; }
}
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;
using System.Numerics;

[Event("Transfer")]
public class ERC721MintEventDto : IEventDTO
{
    [Parameter("address", "from", 1, true)]
    public string From { get; set; }

    [Parameter("address", "to", 2, true)]
    public string To { get; set; }

    [Parameter("uint256", "tokenId", 3, true)]
    public BigInteger TokenId { get; set; }
}
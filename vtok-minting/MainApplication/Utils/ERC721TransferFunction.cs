using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;
using System.Numerics;

[Function("safeTransferFrom", "bool")]
public class ERC721TransferFunction : FunctionMessage
{
    [Parameter("address", "from", 1)]
    public string From { get; set; }


    [Parameter("address", "to", 2)]
    public string To { get; set; }


    [Parameter("uint256", "tokenId", 3)]
    public BigInteger TokenId { get; set; }
}
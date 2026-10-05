using Nethereum.Web3;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts.CQS;
using Nethereum.Util;
using Nethereum.Web3.Accounts;
using Nethereum.Hex.HexConvertors.Extensions;
using Nethereum.Contracts;
using Nethereum.Contracts.Extensions;
using System.Numerics;

[Function("safeTransferFrom", "bool")]
public class ERC1155TransferFunction : FunctionMessage
{
    [Parameter("address", "from", 1)]
    public string From { get; set; }


    [Parameter("address", "to", 2)]
    public string To { get; set; }


    [Parameter("uint256", "id", 3)]
    public BigInteger Id { get; set; }


    [Parameter("uint256", "amount", 4)]
    public BigInteger Amount { get; set; }


    [Parameter("bytes", "data", 5)]
    public byte[] Data { get; set; }
}
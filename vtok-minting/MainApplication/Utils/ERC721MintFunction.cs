using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;

[Function("mint", "uint256")]
public class ERC721MintFunction : FunctionMessage
{
    [Parameter("string", "tokenURI", 1)]
    public String TokenURI { get; set; }
}
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;

using System.Numerics;

[Function("owner", "address")]
public class ERC721ContractOwnerFunction : FunctionMessage
{
}
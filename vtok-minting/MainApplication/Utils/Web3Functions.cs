using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using Nethereum.Util; 
using System.Text.RegularExpressions;
using Nethereum.Contracts;
using System.Numerics;

namespace DefaultNamespace;

public class Web3Functions {

    public static bool IsValidAddress(string address)
    {
        Regex r = new Regex("^(0x){1}[0-9a-fA-F]{40}$");
        if (!r.IsMatch(address)) return false;
        else if (address == address.ToLower()) return true;
        else return new AddressUtil().IsChecksumAddress(address);
    }

    public static async Task<String> GetERC721ContractOwner(String contractAddress) 
    {
        var account = new Account(Constants.privateKey, Constants.chain);
        var web3 = new Web3(account, Constants.endpoint);
        
        var handler = web3.Eth.GetContractQueryHandler<ERC721ContractOwnerFunction>();
        var owner = new ERC721ContractOwnerFunction(){ };
        var receipt = await handler.QueryAsync<string>(contractAddress, owner);
        return receipt.ToString();
    }
    
    // https://docs.nethereum.com/en/latest/contracts/calling-transactions-events/#the-multiply-transaction
    // https://docs.nethereum.com/en/latest/nethereum-smartcontrats-gettingstarted/#querying
    public static async Task<String> GetERC721OwnerOf(String contractAddress, int tokenId) 
    {
        var account = new Account(Constants.privateKey, Constants.chain);
        var web3 = new Web3(account, Constants.endpoint);

        // var contract = web3.Eth.GetContract(abi, contractAddress);
        // var transferFunction = contract.GetFunction("ownerOf");
        // var transactionHash = await transferFunction.SendTransactionAsync(contractAddress, 7);
        // var receipt = await MineAndGetReceiptAsync(web3, transactionHash);

        var handler = web3.Eth.GetContractQueryHandler<ERC721OwnerOfFunction>();
        var ownerOf = new ERC721OwnerOfFunction()
        {
            TokenId = tokenId
        };
        var receipt = await handler.QueryAsync<string>(contractAddress, ownerOf);
        return receipt.ToString();
    }

    public static async Task<BigInteger> MintERC721(String contract, String url) {
        var account = new Account(Constants.privateKey, Constants.chain);
        var web3 = new Web3(account, Constants.endpoint);

        var transferHandler = web3.Eth.GetContractTransactionHandler<ERC721MintFunction>();
        var transfer = new ERC721MintFunction()
        {
            TokenURI = url
        };
        var transactionReceipt = await transferHandler.SendRequestAndWaitForReceiptAsync(contract, transfer);
        
        // https://docs.nethereum.com/en/latest/nethereum-events-gettingstarted/
        var transferEventOutput = transactionReceipt.DecodeAllEvents<ERC721MintEventDto>();
        return transferEventOutput[0].Event.TokenId;
    }

}

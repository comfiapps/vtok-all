using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using Nethereum.Web3.Accounts.Managed;
using Nethereum.Hex.HexTypes;
using Nethereum.Signer; 
using Nethereum.Util; 
using Nethereum.Hex.HexConvertors.Extensions; 
using Nethereum.RPC.Eth.DTOs;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts.CQS;
using Nethereum.Contracts;
using Nethereum.Contracts.Extensions;
using System.Numerics;
using System.Text;

namespace DefaultNamespace;

// http://docs.nethereum.com/en/latest/nethereum-transferring-ether/
public interface IEthereumService
{
    void ManualTransfer();
}

public class EthereumService : IEthereumService
{
    public static String endpoint = "https://rinkeby.infura.io/v3/1345b6747e0d4aa0ac47166f5128a4d6";
    public static String publicKey = "0xad6DC116AC5c04E750f7B6C621527EE62939F039";
    public static String privateKey = "12ef0ea420b65d14035b7d1f6399f7786165cff7112142449980c4cefbab41d2";
    public static String toAddress = "0x2bCc00Ce36E989C7d05207A6CAB96087FcA6e10D";

    public void ManualTransfer() {
        TransferERC721().Wait();
        Console.ReadLine();
    }

    // https://docs.nethereum.com/en/latest/nethereum-transferring-ether/
    public static async Task TransferEther(String toAddress)
    {
        var account = new Account(privateKey, Chain.Rinkeby);
        var web3 = new Web3(account, endpoint);
        
        var transaction = await web3.Eth.GetEtherTransferService()
                            .TransferEtherAndWaitForReceiptAsync(toAddress, 1.11m);

        Console.WriteLine("Ether Transferred Success");
    }

    // https://docs.nethereum.com/en/latest/getting-started/
    static async Task GetAccountBalance()
    {
        var web3 = new Web3(endpoint);
        var balance = await web3.Eth.GetBalance.SendRequestAsync(publicKey);
        Console.WriteLine($"Balance in Wei: {balance.Value}");

        var etherAmount = Web3.Convert.FromWei(balance.Value);
        Console.WriteLine($"Balance in Ether: {etherAmount}");
    }

    // https://docs.nethereum.com/en/latest/nethereum-transferring-ether/
    static async Task TransferEther()
    {

        var account = new Account(privateKey, Chain.Rinkeby);
        var web3 = new Web3(account, endpoint);
        
        var transaction = await web3.Eth.GetEtherTransferService()
                            .TransferEtherAndWaitForReceiptAsync(toAddress, 1.11m);

        Console.WriteLine("Ether Transferred Success");
    }

    // static async Task TransferERC20()
    // {
    //     var contract = "0x996Ee338AFD69BFE438B999D81dfD8080BFB02B9";

    //     var account = new Account(privateKey);
    //     var web3 = new Web3(account, endpoint);
        
    //     var transferHandler = web3.Eth.GetContractTransactionHandler<TransferFunction>();
    //     var transfer = new TransferFunction()
    //     {
    //         To = receiverAddress,
    //         TokenAmount = 100
    //     };
    //     var transactionReceipt = await transferHandler.SendRequestAndWaitForReceiptAsync(contract, transfer);
    // }
    
    static async Task TransferERC721()
    {
        var contract = "0x524bdBfD557D6355f109952f0Ed974beCAF68084";
                
        var account = new Account(privateKey, Chain.Rinkeby);
        var web3 = new Web3(account, endpoint);
        
        var transferHandler = web3.Eth.GetContractTransactionHandler<ERC721TransferFunction>();
        var transfer = new ERC721TransferFunction()
        {
            From = publicKey,
            To = toAddress,
            TokenId = 8
        };
        var transactionReceipt = await transferHandler.SendRequestAndWaitForReceiptAsync(contract, transfer);
        
        Console.WriteLine("ERC-721 Transferred Success");
    }

    // https://docs.nethereum.com/en/latest/nethereum-smartcontrats-gettingstarted/
    static async Task TransferERC1155()
    {
        var contract = "0x996Ee338AFD69BFE438B999D81dfD8080BFB02B9";
                
        var account = new Account(privateKey, Chain.Rinkeby);
        var web3 = new Web3(account, endpoint);
        
        var transferHandler = web3.Eth.GetContractTransactionHandler<ERC1155TransferFunction>();
        var transfer = new ERC1155TransferFunction()
        {
            From = publicKey,
            To = toAddress,
            Id = 0,
            Amount = 3,
            Data = Encoding.ASCII.GetBytes("0x")
        };
        var transactionReceipt = await transferHandler.SendRequestAndWaitForReceiptAsync(contract, transfer);
        
        Console.WriteLine("ERC-1155 Transferred Success");
    }
}
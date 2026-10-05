# 📂 VTOK Minting - `MainApplication` 상세 클래스 및 Web3 유틸리티 명세

`vtok-minting` 프로젝트의 Web3 라이브러리, IPFS 연동 모듈 및 Nethereum DTO 클래스 구현 세부사항입니다.

---

## 🛠️ 1. Web3 & IPFS 유틸리티 (`Utils/`)

### 1.1 `Utils/IPFSFunction.cs`
```csharp
public async Task<string> UploadToNFTStorage(string json)
{
    var httpClient = new HttpClient();
    httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
    httpClient.DefaultRequestHeaders.Authorization = 
        new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", Constants.ipfsApiKey);
    
    var content = new StringContent(json, Encoding.UTF8, "application/json");
    var response = await httpClient.PostAsync(Constants.ipfsAPIURL, content);
    var result = await response.Content.ReadAsAsync<IPFSData>();
    return result.value.cid;
}
```
- `nft.storage` HTTP API (`https://api.nft.storage/upload`)로 JSON 메타데이터를 업로드하고 CID(Content Identifier) 문자열 추출.

### 1.2 `Utils/Web3Functions.cs`
- `IsValidAddress(string address)`: `Regex("^(0x){1}[0-9a-fA-F]{40}$")` 및 Nethereum `AddressUtil().IsChecksumAddress(address)` 검증.
- `MintERC721(string contract, string url)`:
  ```csharp
  var account = new Account(Constants.privateKey, Constants.chain);
  var web3 = new Web3(account, Constants.endpoint);
  var transferHandler = web3.Eth.GetContractTransactionHandler<ERC721MintFunction>();
  var transfer = new ERC721MintFunction() { TokenURI = url };
  var transactionReceipt = await transferHandler.SendRequestAndWaitForReceiptAsync(contract, transfer);
  var transferEventOutput = transactionReceipt.DecodeAllEvents<ERC721MintEventDto>();
  return transferEventOutput[0].Event.TokenId;
  ```

---

## ⚙️ 2. 하드코딩 환경 변수 (`Context/Constants.cs`)

- **Rinkeby RPC Endpoint**: `https://rinkeby.infura.io/v3/1345b6747e0d4aa0ac47166f5128a4d6`
- **Chain**: `Chain.Rinkeby`
- **Owner Public Key**: `0x0F623575D3722d89126435b8D33363F1a8589252`
- **Owner Private Key**: `c7eb5dc3d0a2f4d440676f8fa4452dc247722e5e661474b73d24a0103c29421c`
- **IPFS API URL**: `https://api.nft.storage/upload`

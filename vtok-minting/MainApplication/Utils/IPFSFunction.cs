// using Newtonsoft.Json;
using System.Text;
// using System.Net.Http;

namespace DefaultNamespace;

public class IPFSFunction {

    public async Task<string> UploadToNFTStorage(string json)
    {
        var httpClient = new HttpClient();
        httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
        httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", Constants.ipfsApiKey);
        
        // var json = JsonConvert.SerializeObject(obj, Formatting.None, new JsonSerializerSettings { DefaultValueHandling = DefaultValueHandling.Ignore });
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await httpClient.PostAsync(Constants.ipfsAPIURL, content);
        var result = await response.Content.ReadAsAsync<IPFSData>();
        // var result = await response.Content.ReadAsStringAsync();
        // var cid = JsonConvert.DeserializeObject<IPFSData>(result);
        
        return result.value.cid;
    }
}

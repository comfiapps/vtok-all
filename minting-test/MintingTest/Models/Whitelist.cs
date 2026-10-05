using System.ComponentModel.DataAnnotations;

namespace DefaultNamespace;

public class Whitelist
{
    [Key]
    public string Address { get; set; }

    public DateTime MintTime { get; set; } = DateTime.Now;
    
}
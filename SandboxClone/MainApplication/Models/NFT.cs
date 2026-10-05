using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace DefaultNamespace;

public class NFT
{    
    [Key]
    public int TokenId { get; set; } // PK
    
    [Required]
    public virtual NFTGroup Group { get; set; }
    
    [Required]
    public virtual User Owner { get; set; }
    
    public float Price { get; set; }

    [Required]
    public bool OnSale { get; set; }
    
}
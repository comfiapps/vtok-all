using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DefaultNamespace;

public class NFTGroup
{
    [Key]
    public int GroupId { get; set; } // PK
    
    [Required]
    public string Name { get; set; }
    
    // [Required]
    // public string File { get; set; }
    
    [Required]
    public virtual User Creator { get; set; }
    
    public string Description { get; set; }

}
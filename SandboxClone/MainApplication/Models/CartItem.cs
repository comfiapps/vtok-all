using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DefaultNamespace;

public class CartItem
{
    [Key]
    [Column(Order = 1)]
    public int CartOwner { get; set; }
    
    [Key]
    [Column(Order = 2)]
    public int Group { get; set; }
    
    // [Range(1, 500, ErrorMessage ="Quantity value must be between 1 and 500")]
    public int Quantity { get; set; }
}
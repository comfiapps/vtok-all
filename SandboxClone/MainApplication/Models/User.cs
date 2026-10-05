using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace DefaultNamespace;

public class User
{    
    [Key]
    public int UserId { get; set; }

    [Required]
    public string Name { get; set; }
    
    [Required]
    public string Email { get; set; }
    
    public DateTime CreatedDateTime { get; set; } = DateTime.Now;
}
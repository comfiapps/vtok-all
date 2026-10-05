using System.ComponentModel.DataAnnotations;

namespace DefaultNamespace;

public class KeyValue
{
    [Key]
    public String Key { get; set; }

    [Required]
    public String Value { get; set; }
    
}
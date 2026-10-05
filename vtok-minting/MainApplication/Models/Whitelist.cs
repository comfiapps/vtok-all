using System.ComponentModel.DataAnnotations;

namespace DefaultNamespace;

public class Whitelist
{
    [Key]
    public string Address { get; set; }

    [Required]
    public int Quantity { get; set; }

    public DateTime CreatedDate { get; set; } = DateTime.Now; // 날짜 정렬에 사용
    
}
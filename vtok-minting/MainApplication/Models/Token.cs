using System.Runtime;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DefaultNamespace;

public class Token
{
    [Key]
    [Column(Order = 1)]
    public String Contract { get; set; }
    
    [Key]
    [Column(Order = 2)]
    public int Id { get; set; }

    public DateTime CreatedDate { get; set; } = DateTime.Now; // 날짜 정렬에 사용
    
    public string? Receiver { get; set; }

    public Boolean Received { get; set; }
}
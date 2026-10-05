using System.ComponentModel.DataAnnotations;

namespace DefaultNamespace;

public class Contract
{
    [Key]
    public string Address { get; set; }

    public DateTime CreatedDate { get; set; } = DateTime.Now; // 날짜 정렬에 사용
    
}
using Microsoft.EntityFrameworkCore;

namespace DefaultNamespace;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    public DbSet<Whitelist> Whitelists {  get; set; }
    
}
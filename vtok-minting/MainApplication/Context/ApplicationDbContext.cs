using Microsoft.EntityFrameworkCore;

namespace DefaultNamespace;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Token>().HasKey(table => new {table.Contract, table.Id});
    }

    public DbSet<Whitelist> Whitelists { get; set; }
    public DbSet<Contract> Contracts { get; set; }
    public DbSet<Token> Tokens { get; set; }
    public DbSet<KeyValue> KeyValues { get; set; }
    
}
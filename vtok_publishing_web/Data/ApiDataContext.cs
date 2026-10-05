using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using vtok_publishing_web.Models;

namespace vtok_publishing_web.Data
{
    public class ApiDataContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public ApiDataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to mysql with connection string from app settings
            var connectionString = Configuration.GetConnectionString("DbContext");
                    options.UseMySql(connectionString,ServerVersion.AutoDetect(connectionString));
        }



        //   UserLocationEntity entity = new UserLocationEntity();;

        public DbSet<SitinEntity> SitinEntity { get; set; }

        public DbSet<MittingEntity> MittingEntity { get; set; }

        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SitinEntity>().ToTable("SitinAddr");
            modelBuilder.Entity<MittingEntity>().ToTable("MittingAddr");
        }
    }
}
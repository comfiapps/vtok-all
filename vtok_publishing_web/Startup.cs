using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

using StackExchange.Redis;
using vtok_publishing_web.Data;
using vtok_publishing_web.Repository;
using vtok_publishing_web.Service;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

using SignalRChat.Hubs;


namespace vtok_publishing_web
{
    public class Startup
    {

        public IConfiguration Configuration { get; }


        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private void StartupConfigureServices(IServiceCollection services)
        {

            services.AddControllers();

            services.AddControllersWithViews();


            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";

            });
            /*
            services.AddTransient<IConfiguration>((provider) =>
            {
                return Configuration;
            });

            //ConfigureDevelopmentServices(services);
            services.AddTransient<IMittingRepository, MittingRepository>();
         //   services.AddTransient<ISettingRepository, SettingRepository>();

            services.AddTransient<IMittingService, MittingService>();

            services.AddTransient<IConnectionMultiplexer, ConnectionMultiplexer>((provider) =>
            {
                var RedisString = Configuration.GetConnectionString("RedisConnect");

                return ConnectionMultiplexer.Connect(RedisString);
            });

            //MVC추가
            services.AddMvc();

            services.AddSignalR();
            */
        }


        public void ConfigureProductionServices(IServiceCollection services)
        {
           // services.AddDbContext<ApiDataContext>();
          //  services.AddTransient<IRedisRepository, RedisRepository>();
            StartupConfigureServices(services);

        }

        public void ConfigureDevelopmentServices(IServiceCollection services)
        {

           // services.AddDbContext<ApiDataContext>();
           // services.AddTransient<IRedisRepository, RedisRepository>();

            StartupConfigureServices(services);
        }

        public void ConfigureServices(IServiceCollection services)
        {

          //  services.AddDbContext<ApiDataContext>();
           // services.AddTransient<IRedisRepository, RedisRepository>();
            StartupConfigureServices(services);


        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            

            //  app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors("default");


            app.UseHsts();

            /*
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/ChatHub");

            });
            */
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });


        }
    }


}

using DefaultNamespace;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseMySql(connectionString,ServerVersion.AutoDetect(connectionString)));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Services
builder.Services.AddTransient<ICommonService, CommonService>();
builder.Services.AddTransient<IWhitelistService, WhitelistService>();
builder.Services.AddTransient<IContractService, ContractService>();
builder.Services.AddTransient<IControlService, ControlService>();
builder.Services.AddTransient<IMintService, MintService>();
builder.Services.AddTransient<ITokenService, TokenService>();

// Repositories
builder.Services.AddTransient<IWhitelistRepository, WhitelistRepository>();
builder.Services.AddTransient<IKeyValueRepository, KeyValueRepository>();
builder.Services.AddTransient<IContractRepository, ContractRepository>();
builder.Services.AddTransient<ITokenRepository, TokenRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

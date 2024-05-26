using BL;
using DL;
using DL.DLEducationalFacility;
using Helper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        //tự cấp token
        ValidateIssuer = false,
        ValidateAudience = false,

        //ký vào token
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("HoangMinhDucAnhHoangMinhDucAnh10"))
    };
});

builder.Services.AddScoped<IBLEmployee, BLEmployee>();
builder.Services.AddScoped<IDLEmployee, DLEmployee>();
builder.Services.AddScoped<IBLAuth, BLAuth>();
builder.Services.AddScoped<IDLAuth, DLAuth>();
builder.Services.AddScoped<IBLCriterion, BLCriterion>();
builder.Services.AddScoped<IDLCriterion, DLCriterion>();
builder.Services.AddScoped<IBLEducationalFacility, BLEducationalFacility>();
builder.Services.AddScoped<IDLEducationalFacility, DLEducationalFacility>();
builder.Services.AddScoped<IBLScore, BLScore>();
builder.Services.AddScoped<IDLScore, DLScore>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

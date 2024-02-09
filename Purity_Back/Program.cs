using Purity_Back.Services;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "Default",
                      policy =>
                      {
                          policy.WithOrigins("77.232.139.42:80");

                          policy.WithHeaders("access-control-allow-origin");
                          policy.WithHeaders("content-type");
                      });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ICoursesService, CoursesService>();
builder.Services.AddScoped<IBlogsService, BlogsService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseCors("Default");

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
           Path.Combine(builder.Environment.ContentRootPath, "/root/Purity_Data/assets")),
    RequestPath = "/server/assets"
});

app.UseAuthorization();

app.MapControllers();

app.Run();

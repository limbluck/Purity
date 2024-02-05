using Purity_Back.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyAllowPort4200",
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200");

                          policy.WithHeaders("access-control-allow-origin");
                          policy.WithHeaders("content-type");
                      });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ICoursesService, CoursesService>();
builder.Services.AddScoped<IBlogsService, BlogsService>();

var app = builder.Build();

app.UseCors("MyAllowPort4200");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

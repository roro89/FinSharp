# FinSharp
ASP.NET Core Web API .NET 8

Source project URL: [teddysmithdev/FinShark](https://github.com/teddysmithdev/FinShark.git)

## 0 - Preparation
* Install Visual Studio Code
* Install Visual Studio (For .NET Core 8 framework only)
* Install SQL Server + SSMS (Replaced with PostgreSql)
  ```
  brew install postgresql@15
  ```

Extensions for Visual Studio Code:
* C#
* C# Dev Kit
* .NET Extension Pack
* .NET Install Tool
* Nuget Gallery
* Prettier
* C# Extension Pack By JosKreativ

## 1 - Creating project
```
dotnet new webapi -o api
```

Running `api` project:
```
dotnet watch run
```

## 2 - Models
Models & One-To-Many

## 3 - EntityFramework
Tools to install:
* Microsoft.EntityFrameworkCore.SqlServer
* Microsoft.EntityFrameworkCore.Tools
* Microsoft.EntityFrameworkCore.Design
* Npgsql.EntityFrameworkCore.PostgreSQL (Added as an extra due to replacement of MS SQL Server)
* Npgsql (Added as an extra due to replacement of MS SQL Server)


Database creation

Database migrations

```
dotnet ef migrations add init
```

```
dotnet ef database update
```

Initial data on Stock table
```sql
INSERT INTO finshark.public."Stocks"("Symbol", "CompanyName", "Purchase", "LastDiv", "Industry", "MarketCap")
VALUES ('TSLA', 'Tesla', 100.00, 2.00, 'Automotive', 547100000000)
, ('MSFT', 'Microsoft', 100.00, 1.20, 'Technology', 3179710000000)
, ('SEB', 'Skandinaviska Enskilda banken', 56.00, 2.10, 'Finance', 316960000000)
, ('Swe', 'Swedbank', 44.00, 1.10, 'Finance', 248020000000)
, ('PLTR', 'Plantir', 23.00, 0, 'Technology', 123456)
```

## 4 - Controllers

GET /api/stocks/
GET /api/stocks/{id}

## 5 - DTOs

## 6 - POST (Create)

## 7 - PUT (Update)

## 8 - DELETE

## 9 - Asyn/Await
 * Define methods as async
 * Wrap return type by Task<>
 * Make database calls await and use async methods

For some reasons, EF remove operation is not asynchronious.

## 10 - Repository pattern + DI
Replacing repetetives (abstraction): _context.Stock.FirstOrDefault() -> repo.FindStock()

## 11 - Refactor to Repository

## 12 - Comment System
Initial comment seeding
```sql
INSERT INTO public."Comments"("Title", "Content", "CreatedOn", "StockId")
VALUES ('Test comment', 'This is my test comment content', '2024-04-13 22:11:55', 2)
	 , ('Another test comment', 'This is my another test comment content', '2024-04-13 22:14:00', 2)
	 , ('Another test comment', 'This is my another test comment content', '2024-04-13 22:14:00', 2)
	 , ('Test 2', 'Test comment content', '2024-04-10 14:33:21', 1)
	 , ('Test 3', 'Test 3 comment content', '2024-04-11 11:00:23', 1)
	 , ('Test 4', 'Test 4 comment content', '2024-04-01 10:03:55', 3)
	 , ('Test 5', 'Test 5 comment content', '2024-04-11 11:44:22', 3)
	 , ('Test 6', 'Test 6 comment content', '2024-04-11 12:05:45', 3);	 
```

## 13 - Comment GET + Include()
Installing additional packages:
* Newtonsoft.Json
* Microsoft.AspNetCore.Mvc.NewtonsoftJson (For preventing loop when serializing objects)

## 14 - 1-To-Many Create (Post)

## 15 - Comment UPDATE (Post)

## 16 - Comment DELETE

## 17 - Data Validation

## 18 - Filtering
.AsQueryable() - deffers SQL rendering and allows to do the filtering
.ToList() - Renders SQL

## 19 - Sorting

## 20 - Pagination
Implementation using LINQ: 
* .Skip()
* .Take()

```csharp
    var skipNumber = (query.PageNumber - 1) * query.PageSize;
    return await stocks.Skip(skipNumber).Take(query.PageSize).ToListAsync();
```

## 21 - ASP.NET Core Web API Identity JWT. Install Identity
Installing libraries:
* Microsoft.Extensions.Identity.Core
* Microsoft.AspNetCore.Identity.EntityFrameworkCore
* Microsoft.AspNetCore.Authentication.JwtBearer

Creating user class:

```csharp
public class AppUser : IdentityUser
{
    
}
```

Registering user in DBContext (replace DbContext with IdentityDbContext):
```csharp
public class ApplicationDatabaseContext : IdentityDbContext<AppUser>
{

}
```

Registering in Program.cs
```csharp
builder.Services.AddIdentity<AppUser, IdentityRole>(options=>
    {
        options.Password.RequireDigit = true;
        options.Password.RequireLowercase = true;
        options.Password.RequireUppercase = true;
        options.Password.RequiredLength = 12;
        options.Password.RequireNonAlphanumeric = true;
    })
    .AddEntityFrameworkStores<ApplicationDatabaseContext>();;
```

Adding authentication service and schemes
```csharp
builder.Services.AddAuthentication(options=>
{
    options.DefaultAuthenticateScheme = 
    options.DefaultChallengeScheme = 
    options.DefaultForbidScheme = 
    options.DefaultScheme = 
    options.DefaultSignInScheme = 
    options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options => 
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:Audience"],
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])
        ),
    };
});
```

Adding EF Migrations
```
dotnet ef migrations add Identity
```

```
dotnet ef database update
```

## 22 - Register (User management)
Adding EF migration to add users and roles
```
dotnet ef migrations add SeedRole
```

```
dotnet ef database update
```

## 23 - Token service
Claims vs Roles
* Roles are more generic and broad (old school)
* Claims don't require DB and verify fexible (new school)

**MS has moved away from Roles**

## 24 - Login
For login two things are used:
1. User manager (to find the user)
2. Signing manager (to validate password)

Swagger JWT support:
```csharp
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});
```

## 25 - Many-to-Many
Many-to-Many configuration on EF:
```csharp
builder.Entity<Portfolio>()
    .HasOne(u=>u.AppUser)
    .WithMany(u=>u.Portfolios)
    .HasForeignKey(p=>p.AppUserId);
builder.Entity<Portfolio>()
    .HasOne(u=>u.Stock)
    .WithMany(u=>u.Portfolios)
    .HasForeignKey(p=>p.StockId);
```    

When applying changes to database:
* Need to delete the migrations
* Need to drop the database
* Add EF migration
  ```
    dotnet ef migrations add PortfolioManyToMany
  ```
* Apply changes to database
  ```
    dotnet ef database update
  ```

## 26 - Portfolio GET

## 27 - Porfolio CREATE

## 28 - Portfolio DELETE

## 29 - One-To-One
Model in the model

Adding EF migration
```csharp
dotnet ef migrations add CommentOneToOne
```

## 30 - User generated Content
.Include()
.ThenInclude() - for nested includes

## 31 - Data seeding

## 32 Finish API before React
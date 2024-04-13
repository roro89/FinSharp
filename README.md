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
```
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
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

## 4 - Controllers



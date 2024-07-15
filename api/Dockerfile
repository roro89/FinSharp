# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.sln .
COPY api/*.csproj ./api/
RUN dotnet restore ./api/api.csproj

# Copy everything else and build
COPY api/. ./api/
WORKDIR /app/api
RUN dotnet publish -c Release -o out

# Stage 2: Create the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/api/out ./

# Expose port 80
EXPOSE 80

# Set the entry point
ENTRYPOINT ["dotnet", "api.dll"]

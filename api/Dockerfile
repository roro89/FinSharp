# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Copy csproj and restore as distinct layers
COPY *.csproj ./app
RUN dotnet restore ./app/api.csproj

# Copy everything else and build
COPY . ./app
WORKDIR /app
RUN dotnet publish -c Release -o out

# Stage 2: Create the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

# Copy the certificate
COPY https/aspnetapp.pfx /https/aspnetapp.pfx

# Expose port 80
EXPOSE 80
EXPOSE 443

# Set the entry point
ENTRYPOINT ["dotnet", "api.dll"]

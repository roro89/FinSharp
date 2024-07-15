# Use the official .NET Core SDK image as the build environment
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Copy the built application from the build environment
COPY /api/out/ /usr/app

# Set the working directory inside the container
WORKDIR /usr/app

# Expose port 80 for the API
EXPOSE 80

# Set the entry point for the application
ENTRYPOINT ["dotnet", "api.dll"]

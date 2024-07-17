# Stage 1: Build the React app
FROM node:21 as build

COPY ./package.json ./app
COPY ./package-lock.json ./app

WORKDIR /app

RUN npm install

COPY ./frontend .

RUN ls -la

RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Stage 1: Build the React app
FROM node:21 as build

WORKDIR /app

COPY ./frontent/package.json ./
COPY ./frontent/package-lock.json ./

RUN npm install

COPY ./frontent ./

RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

FROM node:21-alpine

WORKDIR /app/
COPY frontend/public/ /app/public
COPY frontend/src/ /app/src
COPY frontend/package.json /app/

RUN npm install

EXPOSE 80

CMD ["npm", "start"]

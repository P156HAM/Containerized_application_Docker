ARG TAG=20-alpine

FROM node:${TAG}

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . . 

USER node

EXPOSE 3001

CMD ["node", "app.js"]
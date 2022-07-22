FROM node:lts-alpine

WORKDIR /app

COPY package.json ./

COPY / ./

RUN npm install

RUN npm run build


USER node

CMD [ "npm", "run", "start:prod" ]

EXPOSE 3060

FROM node:18.13.0

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN echo "PORT=3000" > .env

CMD [ "npm", "start"]
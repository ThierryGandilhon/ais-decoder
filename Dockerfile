FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY dist /app

CMD node index.js

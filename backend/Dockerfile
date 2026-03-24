FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY src ./src

RUN npm run build

COPY .env ./

EXPOSE 3001

CMD ["node", "dist/server.js"]

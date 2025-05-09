FROM node:22.14.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD [ "npx", "npm", "run", "start:dev" ]
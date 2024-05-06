FROM node:18

WORKDIR /app

COPY package.json .
RUN npm i

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["npx", "serve", "dist"]

FROM node:20-alpine as build
RUN npm i -g pnpm
WORKDIR /app
COPY package*.json ./
RUN pnpm i
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]


FROM node:20-alpine as build
RUN npm i -g pnpm
WORKDIR /app
COPY package*.json ./
RUN pnpm i
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build /app /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
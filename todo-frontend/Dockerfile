FROM node:22-alpine AS build

WORKDIR /app
COPY package.json  .
RUN npm install
COPY . .
RUN npm run build


FROM nginx:alpine-slim
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
FROM node:16-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY ./ .
RUN npm run build

FROM nginx:stable-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/.next /app
COPY nginx.conf /etc/nginx/nginx.conf

# First stage: build the React app
FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Second stage: serve the React app with nginx
# FROM node:latest AS base
FROM nginx:alpine AS base
WORKDIR /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist ./
# COPY --from=build /telkom-domain-dashboard/dist ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
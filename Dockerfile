# First stage: build the React app
FROM node:latest AS build
WORKDIR /app_platform_workspace
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Second stage: serve the React app with nginx
FROM nginx:alpine AS base
COPY --from=build //app_platform_workspace/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
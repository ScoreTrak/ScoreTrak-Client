#Thanks to https://typeofnan.dev/how-to-serve-a-react-app-with-nginx-in-docker/
# Name the node stage "builder"
FROM node:16-bullseye-slim as builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# Only install production packages
RUN npm install
# Build app
ARG API_SERVER_URL=""
ENV VITE_API_SERVER_URL=$API_SERVER_URL
RUN npm run build


# nginx state for serving content
FROM nginx:stable
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/dist .
#redirect 404s to index
RUN sed -i '/index  index.html index.htm;/a try_files \$uri \$uri/ /index.html;' /etc/nginx/conf.d/default.conf
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
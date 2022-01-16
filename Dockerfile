#Thanks to https://typeofnan.dev/how-to-serve-a-react-app-with-nginx-in-docker/
# Name the node stage "builder"
FROM node:14 AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# install buf
RUN BIN="/usr/local/bin" && \
    VERSION="1.0.0-rc10" && \
    BINARY_NAME="buf" && \
    curl -sSL \
      "https://github.com/bufbuild/buf/releases/download/v${VERSION}/${BINARY_NAME}-$(uname -s)-$(uname -m)" \
    -o "${BIN}/${BINARY_NAME}" && \
    chmod +x "${BIN}/${BINARY_NAME}"
# install node modules and build assets
RUN yarn install && yarn build


# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .
#redirect 404s to index
RUN sed -i '/index  index.html index.htm;/a try_files \$uri \$uri/ /index.html;' /etc/nginx/conf.d/default.conf
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
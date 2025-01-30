ARG NGINX_TAG=alpine3.20

FROM nginx:${NGINX_TAG}

COPY index.html /usr/share/nginx/html/index.html

COPY app.js /usr/share/nginx/html/app.js

EXPOSE 1234
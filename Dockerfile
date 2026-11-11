FROM nginx:alpine
EXPOSE 3003
COPY out/ /usr/share/nginx/html/3dttt/
COPY nginx.conf /etc/nginx/nginx.conf

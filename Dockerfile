FROM nginx
COPY www /var/www
COPY config/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
EXPOSE 443
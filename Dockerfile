FROM nginx:stable
MAINTAINER Yanuz Nurchalik

RUN mkdir -p /alterra/www/reactport
RUN mkdir -p /alterra/logs/nginx

COPY default.conf /etc/nginx/conf.d/
COPY . /alterra/www/reactport/

WORKDIR /alterra/www/reactport

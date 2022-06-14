# 接通内部用户权限需要用这个
FROM lardern/tengine:2.3.2 
#作者信息
MAINTAINER  "wuzhiming@goldwind.com.cn"

ADD dist/ /usr/share/nginx/html/

RUN chmod 777 -R /usr/share/nginx/html/

ARG NG_FILE=nginx.conf
ADD ${NG_FILE} /etc/nginx/conf.d/default.conf

EXPOSE 80

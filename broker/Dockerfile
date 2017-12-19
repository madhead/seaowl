FROM rabbitmq:3.7

LABEL maintainer="madhead <siarhei.krukau@gmail.com>"

RUN rabbitmq-plugins enable --offline rabbitmq_management
RUN rabbitmq-plugins enable --offline rabbitmq_mqtt
RUN rabbitmq-plugins enable --offline rabbitmq_web_mqtt

EXPOSE 15672
EXPOSE 15675
EXPOSE 1883

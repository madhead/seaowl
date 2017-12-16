FROM rabbitmq:3.7

LABEL maintainer="madhead <siarhei.krukau@gmail.com>"

RUN rabbitmq-plugins enable --offline rabbitmq_management
RUN rabbitmq-plugins enable --offline rabbitmq_mqtt

EXPOSE 15672
EXPOSE 1883

# build
# docker build -t uhwgmxorg/my-user-management-json-docker-image:0.0.0 .
# use
# docker run -d -p 8081:8081 uhwgmxorg/my-user-management-json-docker-image:0.0.0
# to start the container

FROM node:16.19.0-alpine

USER node
WORKDIR /home/node

ADD --chown=node:node . /home/node
RUN npm install

CMD ["node","server.js","config.js"]
FROM ubuntu:latest

ENV NODE_VERSION=14.17.0
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install curl -y
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
WORKDIR /home

COPY ./ ./

WORKDIR /home
RUN npm i 
RUN npm i -g pm2


# RUN pm2-runtime serve build/ 3000 --name "react-build" --spa

# WORKDIR /home
# CMD pm2-runtime ./V1.0.0/server.js
# EXPOSE 3000 8080 4001 5000



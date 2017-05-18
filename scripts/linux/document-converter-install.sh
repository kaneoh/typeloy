#!/bin/bash
GITHUB_TOKEN="<%= githubToken %>"
DEPLOY_PREFIX="<%= deployPrefix %>"
APP_NAME="<%= appName %>"
CONVERTER_DIR=$DEPLOY_PREFIX/document-converter
CONTAINER_NAME=document-converter-service
set -e

if sudo docker ps -a -f "status=running" | grep -q $CONTAINER_NAME; then
    sudo docker stop $CONTAINER_NAME
fi

if sudo docker ps -a -f "status=exited" | grep -q $CONTAINER_NAME; then
    sudo docker rm $CONTAINER_NAME
fi

if sudo docker images | grep -q document-converter-ws; then
    sudo docker rmi kaneoh/document-converter-ws
fi

sudo rm -rf $CONVERTER_DIR
sudo git clone https://$GITHUB_TOKEN@github.com/kaneoh/docker-document-converter.git $CONVERTER_DIR

sudo docker build -t kaneoh/document-converter-ws $CONVERTER_DIR
sudo docker run -it -d \
    --name $CONTAINER_NAME \
    -e PAYLOAD_MAX_SIZE=10485760 \
    -p 3488:3000 \
    kaneoh/document-converter-ws

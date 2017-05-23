#!/bin/bash
GITHUB_TOKEN="<%= githubToken %>"
DEPLOY_PREFIX="<%= deployPrefix %>"
APP_NAME="<%= appName %>"
CONVERTER_DIR=$DEPLOY_PREFIX/electron-pdf
CONTAINER_NAME=pdf-export-service
set -e

if sudo docker ps -a -f "status=running" | grep -q $CONTAINER_NAME; then
    sudo docker stop $CONTAINER_NAME
fi

if sudo docker ps -a -f "status=exited" | grep -q $CONTAINER_NAME; then
    sudo docker rm $CONTAINER_NAME
fi

if sudo docker images | grep -q document-converter-ws; then
    sudo docker rmi kaneoh/electron-pdf
fi

sudo rm -rf $CONVERTER_DIR
sudo git clone https://$GITHUB_TOKEN@github.com/kaneoh/electron-pdf.git $CONVERTER_DIR

sudo docker build -t kaneoh/electron-pdf $CONVERTER_DIR
sudo docker run -it -d \
    --name $CONTAINER_NAME \
    -p 3000:3000 \
    kaneoh/electron-pdf

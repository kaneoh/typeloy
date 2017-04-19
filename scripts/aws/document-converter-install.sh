#!/bin/bash
GITHUB_TOKEN="<%= githubToken %>"
DEPLOY_PREFIX="<%= deployPrefix %>"
APP_NAME="<%= appName %>"
APP_ROOT=$DEPLOY_PREFIX/$APP_NAME
CONVERTER_DIR=$APP_ROOT/document-converter
CONTAINER_NAME=document-converter-service
set -e

echo STARTING
if sudo service docker status; then
    echo DOCKER FOUND
    if sudo docker ps -a -f "status=running" | grep -q $CONTAINER_NAME; then
        echo STOPPING CONTAINER
        sudo docker stop $CONTAINER_NAME
    fi

    if sudo docker ps -a -f "status=exited" | grep -q $CONTAINER_NAME; then
        echo REMOVING CONTAINER
        sudo docker rm $CONTAINER_NAME
    fi

    if sudo docker images | grep -q document-converter-ws; then
        echo REMOVING IMAGE
        sudo docker rmi kaneoh/document-converter-ws
    fi

    sudo service docker stop
    sudo yum update -y
    sudo yum remove -y docker \
        docker-common \
        container-selinux \
        docker-selinux \
        docker-engine \
        docker-io \
        docker-devel \
        docker-pkg-devel
fi

sudo rm -rf $CONVERTER_DIR
sudo git clone https://$GITHUB_TOKEN@github.com/kaneoh/docker-document-converter.git $CONVERTER_DIR

sudo yum install -y docker-io docker-devel docker-pkg-devel
sudo service docker start
sudo docker build -t kaneoh/document-converter-ws $CONVERTER_DIR
sudo docker run -it -d \
    --name $CONTAINER_NAME \
    -e PAYLOAD_MAX_SIZE=10485760 \
    -p 3488:3000 \
    kaneoh/document-converter-ws
#!/bin/bash
set -e

if sudo service docker status; then
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

sudo yum install -y docker-io docker-devel docker-pkg-devel
sudo service docker start
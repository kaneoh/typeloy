#!/bin/bash
set -e

if sudo service docker status; then
    sudo service docker stop
    sudo apt-get update
    sudo apt-get autoremove -y --purge -y docker-engine
fi

sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
sudo apt-add-repository 'deb https://apt.dockerproject.org/repo ubuntu-xenial main'
sudo apt-get update
sudo apt-cache policy docker-engine
sudo apt-get install -y docker-engine
sudo service docker start
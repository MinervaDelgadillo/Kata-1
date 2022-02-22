#!/bin/sh

# install java 11
apt-get install default-jre=2:1.11-71 -y

# install google chrome
apt-get install libxss1 libappindicator1 libindicator7 -y
wget https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_84.0.4147.89-1_amd64.deb
apt-get install google-chrome-stable_84.0.4147.89-1_amd64.deb
rm google-chrome-stable_84.0.4147.89-1_amd64.deb

# install chrome driver
apt-get install unzip -y
wget https://chromedriver.storage.googleapis.com/84.0.4147.30/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
rm chromedriver_linux64.zip

# download selenium
wget https://selenium-release.storage.googleapis.com/3.141/selenium-server-standalone-3.141.59.jar -O selenium-server.jar

#!/bin/zsh
echo "Looks like everything works as expected!"

echo "Installing Mysql"
sudo apt update \
  && sudo apt install -y mysql-server \
  && sudo service mysql start \
  && echo "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'" | sudo mysql \
  && sudo service --status-all 

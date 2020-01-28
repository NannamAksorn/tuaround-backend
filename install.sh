sudo apt-get update && sudo apt upgrade
sudo apt -y install gnupg2
sudo apt-get install wget ca-certificates
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
sudo apt-get install postgresql-12 postgresql-client-12

sudo apt install  postgis postgresql-12-postgis-3

sudo apt install pgadmin4

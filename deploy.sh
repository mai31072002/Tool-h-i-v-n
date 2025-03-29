#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "No arguments supplied."
    exit 1
fi

# if any command fail, stop the script !
set -e

if [ "$1" == "production" ] ; then
  echo -e "\nPRODUCTION enviroment is not implemented\n"
  exit 1
elif [ "$1" == "beta" ] ; then
  echo -e "\nDeploying on Weatherplus admin portal BETA\n"

  while true; do
    read -p "Are you sure to deploy to BETA? [Y/N] " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo -e "Please answer Y or N.\n";;
    esac
  done

  REMOTE="aoshi@wp.ansuzdev.com"
  TARGET_FOLDER="apps/weatherplus/webapp/admin"
else
  echo "Invalid enviroment deployment."
  exit 1
fi

npm run build

# copy .htaccess file
# cp .htaccess build/
# chmod -R -x+r+X build/assets

# synchronize new files
echo -e "\nCopy file to server"
rsync -urv build/ $REMOTE:$TARGET_FOLDER

echo -e "\nDone"

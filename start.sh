#!/bin/bash

echo "======================= CONFIGURATION ======================"
echo "| Follow the steps to configure your template              |"
echo "============================================================"
read -p "Plugin Name (Ex.: mouseCoordinate): Leaflet." plugin_name

sed -i "s/myplugin/${plugin_name}/g" webpack.*
sed -i "s/myplugin/${plugin_name}/g" package.json
sed -i "s/myplugin/${plugin_name}/g" index.html

mv src/leaflet.myplugin.js src/"leaflet.${plugin_name}.js"
mv src/leaflet.myplugin.css src/"leaflet.${plugin_name}.css"

sed -i "s/mypluginControl/${plugin_name^}/g" src/"leaflet.${plugin_name}.js"
sed -i "s/mypluginConstructor/${plugin_name}/g" src/"leaflet.${plugin_name}.js"

read -p "Plugin Description: " description
sed -i "s/<template-description>/${description}/g" package.json

read -p "Author Name: " author
sed -i "s/<template-author>/${author}/g" package.json

read -p "GitHub Repository URL: " repository
escaped_repository=$(echo $repository | sed 's/\//\\\//g')

sed -i "s/<template-github>/${escaped_repository}/g" package.json

echo
echo "##############################################################"
echo "# Obs.: You Have to modify keywords manually in package.json #"
echo "##############################################################"
echo

echo "UPDATING LICENSE..."
sed -i "s/<COPYRIGHT HOLDER>/${author}/g" LICENSE
year=$(date +%Y)
sed -i "s/<YEAR>/${year}/g" LICENSE
echo "LICENSE UPDATED!"
echo

echo "======================= INSTALL PKGS ======================="
echo "| Installing Dependencies and Development Dependencies     |"
echo "============================================================"
echo
echo "Installing @Latest Dev packages ..."

npm install --save-dev css-loader@latest eslint@latest eslint-config-airbnb@latest eslint-plugin-import@latest mini-css-extract-plugin@latest webpack@latest webpack-cli@latest

echo "**************************************************"
echo "*                 Dev packages OK                *"
echo "**************************************************"
echo
echo "Installing Leaflet Package ..."

npm install --save leaflet@latest

echo "**************************************************"
echo "*                    All done!                   *"
echo "**************************************************"

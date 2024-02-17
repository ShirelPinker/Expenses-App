#!/bin/bash

echo "starting to run server"
# Change to Server directory and run npm start:prod
cd /Users/shirel/Documents/code/shirel-expenses-app/Server/
npm run start:prod &

echo "starting to run client"
# Change to Client directory and run npm start
cd /Users/shirel/Documents/code/shirel-expenses-app/Client
npm run start

echo "all running !!!"

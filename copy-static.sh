#!/bin/bash

echo 'copying compiled files to static-app destination...'
cp ./dist/* ../umf-client-static-build
cp ./staticwebapp.config.json ../umf-client-static-build

#!/bin/bash

rm -rf node_modules
npm install
rm backwards.zip
zip -r backwards.zip *

#!/bin/bash

set -eu

./node_modules/.bin/now scale moci.now.sh 1 --token=$NOW_TOKEN && \
  ./node_modules/.bin/now alias --token=$NOW_TOKEN && \
  ./node_modules/.bin/now scale moci.now.sh 2 --token=$NOW_TOKEN

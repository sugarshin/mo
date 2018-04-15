#!/bin/bash

set -eu

./node_modules/.bin/now alias --token=$NOW_TOKEN && \
./node_modules/.bin/now scale moci.now.sh all 1 --token=$NOW_TOKEN

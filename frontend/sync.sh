#!/bin/bash

npm run build
rsync -avz -e "ssh -p 11567" build/ jabberwocky@srv2.wilzba.ch:app/frontend

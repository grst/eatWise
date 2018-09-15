#!/bin/bash

rsync -avz -e "ssh -p 11567" . jabberwocky@srv2.wilzba.ch:app/backend

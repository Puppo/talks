#!/bin/bash

TALK=$1
ORIGINAL=$2
WEBP=$(echo -n "$2" | sed -E 's#(\..+)$#.webp#')

set -x -e
cp ../../$TALK/assets/__originals/$ORIGINAL __originals
cp ../../$TALK/assets/$WEBP .

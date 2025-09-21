#!/bin/bash

FROM=$1
TO=$(echo -n "$1" | sed -E 's#(\..+)$#.webp#')

set -x -e
convert "$FROM" "$TO"
rm "$FROM"
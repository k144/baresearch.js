#!/bin/sh

terser --mangle eval baresearch.js -o baresearch.min.js && echo -e 'Build successful.\n' || echo -e "Build unsuccessful."
./stats.sh

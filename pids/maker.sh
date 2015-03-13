#! /bin/bash

while read LINE
do
    FILENAME="$(echo -e "${LINE:57:11}" | sed -e 's/[",[:space:]]*$//')"
    TEXT="var helpers = require('../helpers');\r\nmodule.exports = " 
    TEXT+=$LINE
    echo -e $TEXT > $FILENAME.js;
done < $1

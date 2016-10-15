#!/bin/bash
# vim:sw=2:ts=2:sts=2:
TODAY=$(date +%Y%m%d)
APP_NAME="<%= appName %>"
DEPLOY_PREFIX="<%= deployPrefix %>"
APP_ROOT=$DEPLOY_PREFIX/$APP_NAME
MONGO_HOST=<%= host %>
MONGO_PORT=<%= port %>
DB_NAME="<%= dbName =>"
<% if (file) { %>
    ARCHIVE_FILE=<%= file %>
<% } else { %>
    ARCHIVE_FILE=${APP_NAME}_${TODAY}.gz
<% } %>
mongodump -h $MONGO_HOST -p $MONGO_PORT  --archive=$ARCHIVE_FILE --gzip --db $DB_NAME
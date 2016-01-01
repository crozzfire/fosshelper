#!/bin/bash

cd /root/fosshelper

#stop app
forever stop 0

#stop mongo
service mongodb stop

#stop elastic search
service elasticsearch stop

#stop mongo connector
pkill mongo-connector

#Start mongodb replica set
mongod --config /etc/mongodb.conf
mongo
service elasticsearch start
mongo-connector -m localhost:27017 -t localhost:9200 -d elastic_doc_manager&

grunt serve:dist
forever start -a -l forever.log -o out.log -e err.log dist/server/app.js -a

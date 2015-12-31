#!/bin/bash

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

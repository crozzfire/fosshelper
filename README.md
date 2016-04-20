fosshelper
----------
###Building
The following dependencies should be installed first:
* NodeJS+NPM [https://nodejs.org/en/download/]
* MongoDB [https://www.mongodb.org/]
* CasperJS [http://casperjs.org/]
* Elastic Search Server [https://www.elastic.co/]
* Scrapy [http://scrapy.org/]
* PyMongo [https://api.mongodb.org/python/current/]

The rest of the dependencies are be installed by: `npm install`

###Running
A bash startup script is provided for convenience, from the top level directory run:
  ./startup.sh
The script will start a **forever** deamon and start/restart the Mongo and ElasticSearch servers. 
Make sure `grunt-cli` is installed system wide and accessible from the shell. To install grunt-cli globally:
  sudo npm install grunt-cli -g

*This README still has a lot of TODOs ... *

# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class RepocrawlerItem(scrapy.Item):    
    
    id = scrapy.Field()
    name = scrapy.Field()
    owner = scrapy.Field()
    description = scrapy.Field()
    readme = scrapy.Field()
    html_url = scrapy.Field()
    created_at = scrapy.Field()
    updated_at = scrapy.Field()
    git_url = scrapy.Field()
    size = scrapy.Field()
    language = scrapy.Field()
    watchers = scrapy.Field()
    forks = scrapy.Field()
    git_url = scrapy.Field()
    open_issues = scrapy.Field()
    source = scrapy.Field()
    last_crawled_at = scrapy.Field()
    
    pass

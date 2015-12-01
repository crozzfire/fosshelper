# -*- coding: utf-8 -*-
import scrapy, json, re, html2text, datetime, os

from RepoCrawler.items import RepocrawlerItem

class GithubSpider(scrapy.Spider):
	name = "bitbucket"
	allowed_domains = ["bitbucket.org","api.bitbucket.org"]
		
	start_urls = (
		"https://api.bitbucket.org/2.0/repositories",
		)

	def parse(self, response):
		data = json.loads(response.body)
		repos = data['values']
		
		for repo in repos:

			item = RepocrawlerItem()
			item['id'] = 0
			item['name'] = repo['name']
			item['owner'] = { 'url' : repo['owner']['links']['html']['href'], 
							  'type' : '', 
							  'avatar_url' : repo['owner']['links']['avatar']['href'] 
							  }
			item['description'] = repo['description']
			item['html_url'] = repo['links']['html']['href']
			created_on_str = repo['created_on']
			created_on_str = created_on_str[:19]
			item['created_at'] = datetime.datetime.strptime(created_on_str, "%Y-%m-%dT%H:%M:%S")
			updated_on_str = repo['updated_on']
			updated_on_str = updated_on_str[:19]
			item['updated_at'] = datetime.datetime.strptime(updated_on_str, "%Y-%m-%dT%H:%M:%S")
			item['size'] = repo['size']
			item['language'] = repo['language']
			item['source'] = 'bitbucket'
			item['last_crawled_at'] = datetime.datetime.now()
			item['open_issues'] = 0 # no value for issues in the api call.

			watchers = scrapy.Request(repo['links']['watchers']['href'],callback=self.parseWatchers)
			watchers.meta['item'] = item
			yield watchers

			forks = scrapy.Request(repo['links']['forks']['href'],callback=self.parseWatchers)
			forks.meta['item'] = item
			yield forks

			parseReadmeReq = scrapy.Request(item['html_url'],callback=self.parseReadme)
			parseReadmeReq.meta['item'] = item

			yield parseReadmeReq;

			next_page = data['next']
			if next_page:		
				yield scrapy.Request(next_page)
			
		pass

	def parseReadme(self,response):
		item = response.meta['item']
		readmeHtml = response.xpath('//*[@id="readme"]').extract()[0];
		h = html2text.HTML2Text()
		h.ignore_links = True

		item['readme'] = h.handle(readmeHtml)

		yield item	

	def parseWatchers(self,response):
		item = response.meta['item']
		data = json.loads(response.body)
		watchers = data['values']
		item['watchers'] = len(watchers)
		return item

	def parseForks(self,response):
		item = response.meta['item']
		data = json.loads(response.body)
		forks = data['values']
		item['forks'] = len(forks)
		return item






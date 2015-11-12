# -*- coding: utf-8 -*-
import scrapy, json, re, html2text, datetime

from RepoCrawler.items import RepocrawlerItem

class GithubSpider(scrapy.Spider):
	name = "github"
	allowed_domains = ["github.com","api.github.com"]
	http_user = "crozzfire"
	http_pass = "6470e7af836f0a25e5d71d624e5017a74d73b955" #Personal Access Token
	start_urls = (
		"https://api.github.com/search/repositories?q=nodejs&sort=stars",
		)

	def parse(self, response):
		data = json.loads(response.body)
		repos = data['items']
		
		for repo in repos:

			item = RepocrawlerItem()
			item['id'] = repo['id']
			item['name'] = repo['name']
			item['owner'] = { 'url' : repo['owner']['url'], 'type' : repo['owner']['type'], 'avatar_url' : repo['owner']['avatar_url'] }
			item['description'] = repo['description']
			item['html_url'] = repo['html_url']
			item['created_at'] = datetime.datetime.strptime(repo['created_at'], "%Y-%m-%dT%H:%M:%SZ")
			item['updated_at'] = datetime.datetime.strptime(repo['updated_at'], "%Y-%m-%dT%H:%M:%SZ")
			item['git_url'] = repo['git_url']
			item['size'] = repo['size']
			item['language'] = repo['language']
			item['watchers'] = repo['watchers']
			item['forks'] = repo['forks']	    
			item['open_issues'] = repo['open_issues']
			item['source'] = 'github'
			item['last_crawled_at'] = datetime.datetime.now()

			parseReadmeReq = scrapy.Request(repo['html_url'],callback=self.parseReadme)
			parseReadmeReq.meta['item'] = item

			yield parseReadmeReq;

		header_link = response.headers['Link']					
		if re.search(r'; rel="next"', header_link):
			next_page = re.sub(r'.*<(.*)>; rel="next".*', r'\1', header_link)		
			yield scrapy.Request(next_page)
			
		pass

	def parseReadme(self,response):
		item = response.meta['item']
		readmeHtml = response.xpath('//*[@id="readme"]').extract()[0];
		h = html2text.HTML2Text()
		h.ignore_links = True

		item['readme'] = h.handle(readmeHtml)

		yield item		



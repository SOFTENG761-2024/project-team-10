import scrapy
import json
from otago.items import OtagoItem  # Assuming you have OtagoItem defined in items.py
import urllib.parse


class OtagoMarketingSpider(scrapy.Spider):
    name = "otago_marketing_staff"
    start_urls = [
        'https://www.otago.ac.nz/marketing/staff/staffprofiles'
    ]

    def parse(self, response):
        # Extract links to all individual staff profile pages
        profile_links = response.css('.page-layout__body a::attr(href)').getall()

        # Process each profile link
        for link in profile_links:
            if link:
                full_link = response.urljoin(link)
                yield scrapy.Request(url=full_link, callback=self.parse_profile)

    def parse_profile(self, response):
        item = OtagoItem()


        name_title = response.css('h1::text').get(default='N/A').strip()
        if name_title:
            known_titles = ["Dr", "Professor", "Associate Professor", "Assistant Professor", "Mr", "Mrs", "Ms"]
            for title in known_titles:
                if name_title.startswith(title):
                    item['title'] = title
                    item['name'] = ' '.join(name_title.split()[len(title.split()):]).strip()
                    break
            else:
                item['title'] = 'N/A'
                item['name'] = name_title
        else:
            item['title'] = 'N/A'
            item['name'] = 'N/A'


        email = response.css('a[href^="mailto:"]::attr(href)').get(default='N/A').replace("mailto:", "")
        item['email'] = urllib.parse.unquote(email)  # Decode any URL encoded characters
        item['phone'] = response.css('a[href^="tel:"]::text').get(default='N/A').strip()
        item['office'] = response.xpath('//p[contains(text(), "Room")]//text()').get(default='N/A').strip()
        item['image_url'] = response.css('img::attr(src)').get(default='N/A')
        item['degrees'] = response.css('p small::text').get(default='N/A').strip()
        item['teaching_responsibilities'] = response.xpath('//h2[contains(text(), "Teaching responsibilities")]/following-sibling::ul[1]//li/a/text()').getall()

        supervision_details = response.xpath('//ul[li[contains(text(), "PhD students")]]//li/text()').getall()
        item['supervision_details'] = [detail.strip() for detail in supervision_details]

        self.save_to_json(item)

    def save_to_json(self, item):
        with open('otago_staff_profiles.json', 'a') as f:
            json.dump(dict(item), f, indent=4)
            f.write(",\n") 

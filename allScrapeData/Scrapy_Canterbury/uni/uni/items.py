# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy

class UniItem(scrapy.Item):
    title = scrapy.Field()
    name = scrapy.Field()
    phone_number = scrapy.Field()
    office_location = scrapy.Field()
    email = scrapy.Field()
    bio = scrapy.Field()
    appointments = scrapy.Field()
    faculty = scrapy.Field()
    degrees = scrapy.Field()
    fields_of_research = scrapy.Field()
    graduate_research_supervision = scrapy.Field()
    sustainable_development_goals = scrapy.Field()
    image_url = scrapy.Field()

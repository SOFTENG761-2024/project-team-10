# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html



import scrapy

class OtagoItem(scrapy.Item):
    title = scrapy.Field()   
    name = scrapy.Field()  
    email = scrapy.Field()   
    phone = scrapy.Field()   
    office = scrapy.Field() 
    image_url = scrapy.Field()   
    degrees = scrapy.Field()  
    teaching_responsibilities = scrapy.Field()   
    supervision_details = scrapy.Field() 



    # Fields specific to research students
    student_name = scrapy.Field()
    qualifications = scrapy.Field()
    thesis_title = scrapy.Field()
    phd_start_date = scrapy.Field()
    supervisors = scrapy.Field()
    student_email = scrapy.Field()
    research_summary = scrapy.Field()
    research_interests = scrapy.Field()


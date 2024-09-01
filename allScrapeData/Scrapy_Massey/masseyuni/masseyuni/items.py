# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html


import scrapy

class MasseyuniItem(scrapy.Item):
    # Basic Information
    title = scrapy.Field()                
    name = scrapy.Field()                 
    post_nominal_titles = scrapy.Field()   
    
    # Contact Information
    email = scrapy.Field()               
    phone_1 = scrapy.Field()              
    phone_2 = scrapy.Field()               
    location = scrapy.Field()             
    campus = scrapy.Field()                
    
    # Position Information
    position = scrapy.Field()              
    position_1 = scrapy.Field()           
    department = scrapy.Field()            

    # Additional Information
    image_url = scrapy.Field()             
    bio = scrapy.Field()                   
    qualifications = scrapy.Field()        
    certifications = scrapy.Field()       
    prizes_awards = scrapy.Field()        
    
    research_interests = scrapy.Field()   
    thematics = scrapy.Field()            
    expertise = scrapy.Field()             
    keywords = scrapy.Field()              







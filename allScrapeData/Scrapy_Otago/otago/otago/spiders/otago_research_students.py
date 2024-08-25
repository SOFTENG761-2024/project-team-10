import scrapy
import json
from otago.items import OtagoItem  # Assuming you're using the same item structure

class OtagoResearchStudentsSpider(scrapy.Spider):
    name = "otago_research_students"
    start_urls = [
        'https://www.otago.ac.nz/marketing/staff/researchstudents'
    ]

    def parse(self, response):
        student_links = response.css('p a::attr(href)').getall()

        for link in student_links:
            full_link = response.urljoin(link)
            yield scrapy.Request(url=full_link, callback=self.parse_student_profile)

    def parse_student_profile(self, response):
        item = OtagoItem()

        item['student_name'] = response.css('h1.page-banner__title::text').get(default='N/A').strip()
        item['qualifications'] = response.xpath('//p[strong[contains(text(),"Qualifications")]]/text()').get(default='N/A').strip()

        thesis_title = response.xpath('//p[strong[contains(text(),"Thesis title")]]/text() | //p[strong[contains(text(),"Thesis title")]]/following-sibling::text()').get(default='N/A').strip()
        item['thesis_title'] = thesis_title
        item['phd_start_date'] = response.xpath('//p[strong[contains(text(),"PhD start date")]]/text()').get(default='N/A').strip()
  
        supervisors = response.xpath('//p[strong[contains(text(),"Supervisors")]]//text()').getall()
        supervisors = [supervisor.strip().strip(",") for supervisor in supervisors if supervisor.strip() not in ["", "Supervisors:"]]
        item['supervisors'] = ", ".join(supervisors) if supervisors else "N/A"

        item['student_email'] = response.css('a[href^="mailto:"]::attr(href)').get(default='N/A').replace("mailto:", "")
        item['research_summary'] = response.xpath('//h2[contains(text(),"Research summary")]/following-sibling::p//text()').get(default='N/A').strip()

        research_interests_ul = response.xpath('//h2[contains(text(),"Research interests")]/following-sibling::ul[1]//li/text()').getall()
        research_interests_p = response.xpath('//h2[contains(text(),"Research interests")]/following-sibling::p//text()').getall()
        research_interests = research_interests_ul + [interest.strip() for interest in research_interests_p if interest.strip()]
        item['research_interests'] = research_interests if research_interests else ['N/A']



        self.save_to_json(item)

    def save_to_json(self, item):
        item_dict = dict(item)
        item_json = json.dumps(item_dict, indent=4)

        with open('otago_research_students.json', 'a') as f:
            f.write(item_json)
            f.write(",\n") 

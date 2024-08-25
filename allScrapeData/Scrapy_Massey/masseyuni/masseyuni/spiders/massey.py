import logging
import re
import time
import scrapy
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from scrapy.http import HtmlResponse
from masseyuni.items import MasseyuniItem  

class MasseyUniSpider(scrapy.Spider):
    name = "massey_uni"
    start_urls = [
        'https://www.massey.ac.nz/massey/expertise/profile.cfm',
    ]

    def __init__(self, *args, **kwargs):
        super(MasseyUniSpider, self).__init__(*args, **kwargs)
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--disable-gpu')
        options.add_argument('--no-sandbox')
        self.driver = webdriver.Chrome(options=options)
        self.driver.implicitly_wait(10)

        # Initialize an empty list to store the scraped data
        self.scraped_data = []

    def parse(self, response):
        self.driver.get(response.url)

        # Click the "People search (Filtering)" tab to display the list of people
        self.driver.find_element(By.ID, "ui-id-2").click()

        # Select the "Academic expert" radio button
        academic_expert_radio = self.driver.find_element(By.XPATH, "//input[@name='radio_staff_or_academic' and @value='academic']")
        academic_expert_radio.click()

        while True:
            WebDriverWait(self.driver, 20).until(
                EC.visibility_of_element_located((By.ID, "mu_dt_table_person"))
            )

            # Get the updated page source after clicking
            html = self.driver.page_source
            selenium_response = HtmlResponse(url=self.driver.current_url, body=html, encoding='utf-8')

            person_links = selenium_response.css('tbody tr td a::attr(href)').extract()
            departments = selenium_response.css('tbody tr td:nth-child(4)::text').extract() 
        

            for link, department in zip(person_links, departments):
                department = department.strip().lower()              
                if "business" in department or "law" in department or "massey business school" in department:
                    full_link = response.urljoin(link)
                    self.log(f'Processing profile: {full_link}')
                    yield scrapy.Request(url=full_link, callback=self.parse_profile, meta={'department': department})
                else:
                    self.log(f"Skipped department: {department}")

            # Check if there is a "Next" button for pagination
            try:
                next_button = WebDriverWait(self.driver, 10).until(
                    EC.element_to_be_clickable((By.ID, "mu_dt_table_person_next"))
                )
                self.driver.execute_script("arguments[0].click();", next_button)
                time.sleep(5)  
            except Exception as e:
                self.log(f"Failed to handle pagination: {str(e)}", level=logging.ERROR)
                break


        
    def parse_profile(self, response):
        department = response.meta['department']
        
        name_title = response.css('h1::text').get(default='N/A').strip()
        post_nominal_titles = response.css('span.pf_postnomtitle::text').get(default='N/A').strip()

        item = MasseyuniItem()

        # Split the title and name
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


        main_position = response.css('#mainContent > div.contentMiddle.box-shadow > div > div:nth-child(2) > div.pf_outer > div.pf_details.pf_right > h2::text').get(default='N/A').strip()


        another_position = response.xpath('//*[@id="mainContent"]/div[2]/div/div[2]/div[3]/div[2]/text()[1]').get(default='N/A').strip()
        item['post_nominal_titles'] = post_nominal_titles
        item['image_url'] = response.css('.pf_left img::attr(src)').get(default='N/A')
        item['phone_1'] = response.css('span#contact + span::text').get(default='N/A')
              

        string1 = response.xpath('//script[contains(text(), "var string1")]/text()').re_first(r'var string1 = "(.*?)";', default='N/A')
        string2 = response.xpath('//script[contains(text(), "var string2")]/text()').re_first(r'var string2 = "(.*?)";', default='N/A')
        string3 = response.xpath('//script[contains(text(), "var string3")]/text()').re_first(r'var string3 = "(.*?)";', default='N/A')

        if string1 != 'N/A' and string2 != 'N/A' and string3 != 'N/A':
            item['email'] = string1 + string2 + string3
        else:
            item['email'] = 'N/A'

       
        contact_info = ' '.join(response.css('ul.locations li::text').getall())
        item['phone_2'] = re.search(r'Ph:\s*(\S+)', contact_info).group(1) if re.search(r'Ph:\s*(\S+)', contact_info) else 'N/A'
        item['location'] = re.search(r'Location:\s*(.*?)(?=\s*Campus:|$)', contact_info).group(1).strip() if re.search(r'Location:\s*(.*?)(?=\s*Campus:|$)', contact_info) else 'N/A'
        item['campus'] = re.search(r'Campus:\s*(.*)', contact_info).group(1).strip() if re.search(r'Campus:\s*(.*)', contact_info) else 'N/A'
        item['position_1'] = another_position
        item['department'] = department

        # Scrape Bio
        bio = response.css('div.pf_toggle p::text').getall()
        if bio:
            item['bio'] = ' '.join(bio).strip()


        qualifications = response.css('div.pf_section ul.qualifications li').getall()
        if qualifications:
            item['qualifications'] = [
                ', '.join(q.css('::text').getall()).replace(' ,', ',').strip()
                for q in response.css('div.pf_section ul.qualifications li')
            ]


        certifications = response.css('div.pf_section ul.registrations li').getall()
        if certifications:
            item['certifications'] = [
                ', '.join(c.css('::text').getall()).replace(' ,', ',').strip()
                for c in response.css('div.pf_section ul.registrations li')
            ]

        prizes_awards = response.css('div.pf_section h2:contains("Prizes and Awards") + ul.prize_award li')
        if prizes_awards:
            item['prizes_awards'] = [
                p.css('::text').get().strip() for p in prizes_awards
            ]
        else:
            item['prizes_awards'] = 'N/A' 


        item['research_interests'] = response.css('div.pf_section h2:contains("Research Interests") + p::text').get(default='N/A').strip()
        item['thematics'] = response.css('div.pf_section h2:contains("Thematics") + p::text').get(default='N/A').strip()

        expertise = response.css('div.pf_section h2:contains("Area of Expertise") + p::text').getall()
        if expertise:
            item['expertise'] = ' '.join([e.strip() for e in expertise])

        keywords = response.css('div.pf_section h2:contains("Keywords") + p::text').getall()
        if keywords:
            item['keywords'] = [k.strip() for k in keywords]
        else:
            item['keywords'] = 'N/A' 


        self.scraped_data.append(dict(item))

        yield item



    def save_profile_data(self):
        with open('profiles.json', 'w') as f:
            json.dump(self.scraped_data, f, indent=4)

    def closed(self, reason):
        self.save_profile_data()
        self.driver.quit()

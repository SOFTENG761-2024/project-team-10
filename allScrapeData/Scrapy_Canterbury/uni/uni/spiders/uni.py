import scrapy
import json
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from scrapy.http import HtmlResponse
from scrapy_selenium import SeleniumRequest
import logging
from uni.items import UniItem

class UniSpider(scrapy.Spider):
    name = "uni"
    start_urls = [
        'https://profiles.canterbury.ac.nz/search?back&by=text&type=user',
    ]

    def __init__(self, *args, **kwargs):
        super(UniSpider, self).__init__(*args, **kwargs)
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--disable-gpu')
        options.add_argument('--no-sandbox')
        options.add_argument('start-maximized')
        self.driver = webdriver.Chrome(options=options)

    def parse(self, response):
        self.driver.get(response.url)

        while True:
            # Wait for the page to fully load
            WebDriverWait(self.driver, 20).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "div.profileStub__name___lWU19 a"))
            )

            html = self.driver.page_source
            selenium_response = HtmlResponse(url=self.driver.current_url, body=html, encoding='utf-8')

            profile_links = selenium_response.css("div.profileStub__name___lWU19 a::attr(href)").extract()
            faculties = selenium_response.css("ul.stubContent__customFilter___ib_pC[title='Faculty'] li.stubContent__value___XETFW span::text").extract()

            if not profile_links:
                self.log("No profile links found on this page.", level=logging.ERROR)

            for link, faculty in zip(profile_links, faculties):
                if 'Faculty of Law' in faculty or 'Business School' in faculty or 'UC Business School' in faculty:
                    full_link = response.urljoin(link)
                    self.log(f'Processing profile: {full_link}')
                    yield scrapy.Request(full_link, callback=self.parse_profile)

            # Check if there is a "Next" button for pagination
            try:
                next_button = WebDriverWait(self.driver, 10).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, "button[aria-label='Move to the next page']"))
                )
                if next_button.is_enabled():
                    next_button.click()
                    time.sleep(25)  
                else:
                    self.log("No more pages to crawl.", level=logging.INFO)
                    break
            except Exception as e:
                self.log(f"Failed to handle modal: {str(e)}", level=logging.ERROR)  
                break

    def parse_profile(self, response):
        self.driver.get(response.url)

        WebDriverWait(self.driver, 25).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "h1.hero__header___xfv2U"))
        )

        html = self.driver.page_source
        response = HtmlResponse(url=self.driver.current_url, body=html, encoding='utf-8')

        item = UniItem()
        item['title'] = response.css("p.hero__title___qQUiv::text").get(default='N/A').strip()
        item['name'] = response.css("h1.hero__header___xfv2U::text").get(default='N/A').strip()


        # Extract the image URL
        relative_image_url = response.css("div.thumbnail__thumbnailContainer___mlIkK img::attr(src)").get()
        if relative_image_url:
            item['image_url'] = response.urljoin(relative_image_url)  
        else:
            item['image_url'] = 'N/A'   
        
        item['phone_number'] = self.handle_modal('phoneModalButton', "div.iconAndContentRow__content___ZD5ge")
        item['office_location'] = self.handle_modal('locationModalButton', "div.iconAndContentRow__content___ZD5ge")
        item['email'] = self.handle_modal('emailModalButton', "a[href^='mailto:']")
        item['bio'] = self.extract_section_by_header(response, "BIO")
        item['appointments'] = self.extract_section_by_header(response, "TE WHARE WĀNANGA O WAITAHA - UNIVERSITY OF CANTERBURY APPOINTMENTS")
        item['faculty'] = self.extract_section_by_header(response, "FACULTY")
        item['degrees'] = self.extract_degrees(response)
        item['fields_of_research'] = self.extract_fields_of_research(response)
        item['graduate_research_supervision'] = self.extract_section_by_header(response, "GRADUATE RESEARCH SUPERVISION")
        item['sustainable_development_goals'] = self.extract_section_by_header(response, "SUSTAINABLE DEVELOPMENT GOALS")


        yield item

    def extract_fields_of_research(self, response):
        fields_of_research = []
        section_container = response.xpath("//h2[text()='FIELDS OF RESEARCH']/ancestor::div[@data-qa='whitebox tags']")
        if section_container:
            research_items = section_container.css("ul[aria-label='Fields of Research'] li[role='listitem']")
            for item in research_items:
                research_field = item.css("div.tag__value___ePSCW span::text").get(default='N/A').strip()
                if research_field and research_field != 'N/A':
                    fields_of_research.append(research_field)
        return fields_of_research if fields_of_research else 'N/A'

    def handle_modal(self, button_data_qa, content_selector):
        try:
            button = WebDriverWait(self.driver, 5).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, f"button[data-qa='{button_data_qa}']"))
            )
            button.click()
            modal_content = WebDriverWait(self.driver, 5).until(
                EC.visibility_of_element_located((By.CSS_SELECTOR, "div.modal__modalBody___jYlW4"))
            )
            content = modal_content.find_element(By.CSS_SELECTOR, content_selector).text
            close_button = self.driver.find_element(By.CSS_SELECTOR, "button[aria-label='Close window']")
            close_button.click()
            return content.strip()
        except Exception as e:
            self.log(f"Failed to extract content from modal: {button_data_qa} - {e}", level=logging.ERROR)
            return 'N/A'

    def extract_section_by_header(self, response, header_text):
        section_data = []
        section_container = response.xpath(f"//h2[text()='{header_text}']/ancestor::div[@data-qa='whitebox']")
        if section_container:
            list_items = section_container.css("ul li.whiteBox__item___CEvqP, ul li.whiteBox__compact___LkxnT, ul li[role='listitem']")
            if list_items:
                for item in list_items:
                    if header_text == "FACULTY":
                        faculty_name = item.css("span.whiteBox__itemContent___ZXxXU::text").get(default='N/A').strip()
                        if faculty_name and faculty_name != 'N/A':
                            section_data.append(faculty_name)
                    elif header_text == "GRADUATE RESEARCH SUPERVISION":
                        supervision_text = item.css("span.whiteBox__itemContent___ZXxXU::text").get(default='N/A').strip()
                        if supervision_text and supervision_text != 'N/A':
                            section_data.append(supervision_text)
                    elif header_text == "SUSTAINABLE DEVELOPMENT GOALS":
                        goal_text = item.css("span.whiteBox__itemContent___ZXxXU::text").get(default='N/A').strip()
                        if goal_text and goal_text != 'N/A':
                            section_data.append(goal_text)
                    elif header_text == "FIELDS OF RESEARCH":
                        research_field = item.css("div.tag__value___ePSCW span::text").get(default='N/A').strip()
                        if research_field and research_field != 'N/A':
                            section_data.append(research_field)
                    else:
                        title = item.css("span.whiteBox__itemTitle___EEjVf::text").get(default='N/A').strip()
                        content = item.css("div.profileItemList__listItemLine___Dh_ad span::text").get(default='N/A').strip()
                        if title != 'N/A' or content != 'N/A':
                            section_data.append(f"{title}: {content}" if content else title)
            else:
                section_data = section_container.css("div.whiteBox__body___nZQwU p::text").getall()
        return section_data if section_data else 'N/A'

    
    
    
    def extract_degrees(self, response):
        degrees = []
        degree_section = response.xpath("//h2[text()='DEGREES']/ancestor::div[@data-qa='whitebox degree']")
        if degree_section:
            degree_items = degree_section.css("ul li.whiteBox__item___CEvqP")
            for item in degree_items:
                degree_title = item.css("span.whiteBox__itemTitle___EEjVf::text").get(default='N/A').strip()
                institution = item.css("div.profileItemList__listItemLine___Dh_ad span::text").get(default='N/A').strip()
                degrees.append(f"{degree_title}: {institution}")
        return degrees if degrees else 'N/A'


    def save_profile_data(self, profile_data):
        self.log(f"Saving data for {profile_data['person']['name']}")
        with open('profiles.json', 'a') as f:
            json.dump(profile_data, f, indent=4)
            f.write(",\n")

    def closed(self, reason):
        self.driver.quit()

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter

import json

class MasseyuniPipeline:
    def open_spider(self, spider):
        self.file = open('profiles.json', 'w')
        self.file.write('[')
        self.first_item = True

    def close_spider(self, spider):
        self.file.write(']')
        self.file.close()

    def process_item(self, item, spider):
        if not self.first_item:
            self.file.write(',\n')
        self.first_item = False
        line = json.dumps(ItemAdapter(item).asdict())
        self.file.write(line)
        spider.log(f"Item processed: {line}")  
        return item

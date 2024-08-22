# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

import json

class UniPipeline:
    def open_spider(self, spider):
        self.file = open('profiles.json', 'w')  # Open JSON file for writing
        self.file.write('[\n')  # Write the opening bracket for JSON array
        self.first_item = True  # Flag to manage commas in JSON

    def close_spider(self, spider):
        self.file.write('\n]')  # Write the closing bracket for JSON array
        self.file.close()  # Close the file

    def process_item(self, item, spider):
        # Convert the item to JSON format
        line = json.dumps(dict(item), indent=4)
        
        # Handle commas between JSON objects properly
        if not self.first_item:
            self.file.write(',\n')  # Write a comma before the next item
        else:
            self.first_item = False  # Skip the comma for the first item

        self.file.write(line)  # Write the JSON line to the file
        return item  # Return the item for further processing if needed


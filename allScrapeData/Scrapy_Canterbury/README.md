# University of Canterbury Web Scraper

This project is a web scraper built using Scrapy and Selenium to collect profile information from the University of Canterbury's faculty directory. The scraper focuses on extracting data related to specific faculties, primarily within the Business School, UC Business School, and Faculty of Law, and stores the information in JSON format.

## Installation

### Prerequisites

- Python 3.x
- pip
- Virtualenv (optional but recommended)

### Setup

1. **Clone the repository:**
   git clone
   cd SCRAPY_PRAC

2. Create and activate a virtual environment (optional but recommended):
   python -m venv venv

   ### activate the virtual environment

   #### For Windows-

   venv\Scripts\activate

   #### For macOS or Linux-

   source venv/bin/activate

3. Install the required Python packages:
   pip install -r requirements.txt

#### Run the Spider:

scrapy crawl uni

The scraped data will be saved in profiles.json.

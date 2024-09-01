# Otago Staff and Research Students Scraper

This project is a Scrapy-based web scraping tool designed to collect information about staff profiles and research students from the University of Otago's Marketing Department website. The collected data is saved into JSON files for further analysis or processing.

## Project Structure

- **spiders/**
  - `otago_marketing_staff.py`: Scraper for collecting data about staff members.
  - `otago_research_students.py`: Scraper for collecting data about research students.
- **items.py**: Defines the data fields (item structure) that the spiders collect.

- **otago_staff_profiles.json**: Output JSON file containing scraped staff profiles.

- **otago_research_students.json**: Output JSON file containing scraped research student profiles.

## Installation

### Prerequisites

- Python 3.x
- pip
- Virtualenv (optional but recommended)

### Setup

1. **Clone the repository:**
   git clone
   cd SCRAPY_OTAGO

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

##### Running the Staff Profile Scraper

scrapy crawl otago_marketing_staff

##### Running the Research Students Scraper

scrapy crawl otago_research_students

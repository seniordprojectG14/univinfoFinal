The Dining hall scrapers are pretty easily labeled. 
The difference between Final_Scraper.py and AT.py is that AT.py is an attempt at automating the scraping. It calls the run() method of final_scraper and pushes to git.
It works in a vaccum, but is having trouble being schedules to run automatically with Windows Task Scheduler, so for not it is highlt advised to manually push them until AT.py is working.
Make sure to change the term and re-scrape courses when a new semester starts. The term variable can be found in Final_Scraper.py and is currently set to "Spring 2023".
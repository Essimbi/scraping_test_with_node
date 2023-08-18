This script uses the Puppeteer and Node Cron libraries to implement a bot that can automatically scrape data from a website in a scheduled manner.

Puppeteer allows to control a browser programmatically, here Chromium is launched in headless mode to not display any interface. A new page is opened and navigates to the target URL.

Some data is then extracted from the page:

    The names of the displayed images
    The content of an element after clicking a button
    The URLs of the images
    This data is saved to text files on the disk.

A form is also filled and submitted, the response message is retrieved.

The images are downloaded one by one and saved locally.

The browser is closed at the end of the processing.

Node Cron allows scheduling the execution of the Puppeteer script every 5 minutes.

This bot therefore allows extracting and automatically updating data from a website regularly. It could be deployed on a server to ensure autonomous monitoring and scraping.
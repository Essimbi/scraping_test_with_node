const puppeteer = require('puppeteer');

const USERNAME = 'essimbideranot@gmail.com'; 
const PASSWORD = 'deranot@77';
const PROFILE_URL = 'https://www.linkedin.com/in/deranot-essimbi/';

(async () => {
  const browser = await puppeteer.launch({headless: 'new'});
  const page = await browser.newPage();

  await page.goto('https://www.linkedin.com/in/deranot-essimbi/');
//   await page.screenshot({path: "profile.jpg", fullPage: true}) ;

  await page.type('input[name="session_key"]', USERNAME);
  await page.type('input[name="session_password"]', PASSWORD);

  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);

  await page.goto(PROFILE_URL);

//   Extract profile data here
  const name = await page.evaluate(() => {
    return document.querySelector('.name').innerText; 
  });

  console.log(name);

  await browser.close();
})();
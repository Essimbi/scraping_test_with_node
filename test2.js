const puppeteer = require("puppeteer") ;

const EMAIL = "essimbideranot@gmail.com" ;
const PASSWORD = "deranot@77" ;

async function offreLink () {
    const browser = await puppeteer.launch();
    // Open new page and navigate to the URL
    var page = await browser.newPage()
    // Open URL in a new tab
    try {
        await page.goto("https://www.linkedin.com/jobs/collections/recommended/?currentJobId=3691366330") ;
        // await page.screenshot({path: "offre.jpg", fullPage: true}) ;

        await page.type("#email-address", EMAIL),
        await page.type("#password", PASSWORD),
        await Promise.all([
            page.waitForNavigation() ,
            page.click("#join-form-submit") 
        ]) ;

        await page.screenshot({path: "offre.jpg", fullPage: true}) ;
    } 
    catch (error) { console.log(error) ; }
    finally { await browser.close() ; }
}

offreLink() ;
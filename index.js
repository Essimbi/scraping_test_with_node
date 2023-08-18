const puppeteer = require('puppeteer');
const fs = require("fs/promises") ;
const cron = require('node-cron') ;

/**
 * Fonction de lancement du bot
 */
async function start() {
    // Init du navigateur
    const browser = await puppeteer.launch({headless: true});
    // Création d'une nouvelle page
    const page = await browser.newPage();
    // On ouvre la page d'accueil
    await page.goto("https://learnwebcode.github.io/practice-requests/");
    // Capture d'écran de la page d'accueil
    // await page.screenshot({ path: "amazing.png", fullPage:true });

    // Récupération des noms des images du site
    const names = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".info strong")).map(x => x.textContent) ;
    });
    // Stockage des noms des images récupérés
    fs.writeFile("names.txt", names.join("\r\n")) ;

    // Cliquer sur un bouton et récupérer le contenu qui s'affiche
    await page.click("#clickme") ;
    const clickData = await page.$eval("#data", el => el.textContent) ;
    console.log(clickData) ;

    // Récupération des images du site
    const photos = await page.$$eval("img", (images) => {
        return images.map(x => x.src) ;
    }) ;

    // Saisir une info dans un champs de formulaire
    await page.type("#ourfield", "blue") ;
    await Promise.all([page.click("#ourform button"), page.waitForNavigation()]) ;
    const info = await page.$eval("#message", x => x.textContent) ;
    console.log(info);

    // Enrégistrement des images sur le disque du serveur
    for (let photo of photos) {
        const imagePage = await page.goto(photo) ;
        await fs.writeFile(photo.split("/").pop(), await imagePage.buffer()) ;
    }

    // Fermeture du navigateur
    await browser.close();
}

cron.schedule("*/5 *****", start) ;
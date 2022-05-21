// @ts-check

const { expect } = require("@playwright/test");
const {chromium} = require("playwright");
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({headless: false});
    
    const page = await browser.newPage();
    await page.goto("https://www.elcorteingles.es/videojuegos/A37046604-consola-playstation-5/");
    
    // This fragment is to accept cookies
    await page.click('text=Modifica tu configuración');
    await page.click('text=Aceptar todas');

    //
    // const content = await page.textContent('[id="js_add_to_cart_desktop"]');

    // Screenshot of the full screen ([fullPage:true]=FullScreen screenshot)
    await page.screenshot({ path: "ps5.png", fullPage: true });

    // const cookies = await context.cookies()
    // const cookieJson = JSON.stringify(cookies)
    // fs.writeFileSync('cookies.json', cookieJson)

    await browser.close();

})()
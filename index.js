// @ts-check

const { expect } = require("@playwright/test");
const {chromium} = require("playwright");
const fs = require('fs');

const shops = [
    // {
    //     vendor: "Game",
    //     url: "https://www.game.es/consola-playstation-5-playstation-5-183224",
    //     checkStock: async ({page}) => {
    //         const content = await page.textContent('.product-quick-actions');
    //         return content.includes("Producto no disponible") == false;
    //     }
    // },
    // {
    //     vendor: "Corte Ingles",
    //     url: "https://www.elcorteingles.es/videojuegos/A37046604-consola-playstation-5/",
    //     checkStock: async ({page}) => {
    //         // This fragment is to accept cookies
    //         await page.click('text=Modifica tu configuración');
    //         await page.click('text=Aceptar todas');

    //         const content = await page.textContent('[id="js_add_to_cart_desktop"]');
    //         return content.includes("Agotado temporalmente") == false;
    //     }
    // },
    {
        vendor: "Media Markt",
        url: "https://www.mediamarkt.es/es/product/_consola-sony-ps5-825-gb-4k-hdr-blanco-1487016.html",
        checkStock: async ({page}) => {
            // This fragment is to accept cookies
            await page.click('text=Denegar todo');

            const content = await page.textContent('[data-product-online-status="NOT_IN_ASSORTMENT"]');
            console.log(content);
            return content.includes("NOT_IN_ASSORTMENT") == false;
        }
    },
];

(async () => {
    const browser = await chromium.launch({headless: false});
    
    for (const shop of shops) {
        const {checkStock, vendor, url} = shop;
        const page = await browser.newPage();
        await page.goto(url);
        const hasStock = await checkStock({page});
        await page.screenshot({path: `screenshots/${vendor.charAt(0).toLowerCase() + vendor.substring(1).replace(/\s/g, '')}.png`});
        console.log(`${vendor} has stock: ${hasStock}`);
        await page.close();
    }

    await browser.close();

})()
const puppeteer = require('puppeteer');
require('dotenv').config();

const username = process.env.TD_USERNAME;
const password = process.env.TD_PASSWORD;

async function getCreditBalance() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.td.com/ca/en/personal-banking');


    const loginButtonHref = await page.evaluate(() => document.querySelector("#button-0087a7942e").href);

    await page.goto(loginButtonHref);


    await page.type("#username", username);
    await page.type("#uapPassword", password);

    await page.click(".btn.btn-block.td-button-secondary");
    await page.waitForNavigation({waitUntil: 'networkidle2'});


    const iframe = await page.$("html > frameset > frame:nth-child(1)");
    const iframeContent = await iframe.contentFrame();

    const credbalance = await iframeContent.$eval("#pfs_main > div > div > div.td-layout-column.td-layout-column-first > div.td-details1 > div > table > tbody > tr:nth-child(2) > td:nth-child(2)", (e1) => e1.innerText);
    // console.log(credbalance);

    await iframeContent.$eval("#td-layout-contentarea > div.td-layout-column.td-layout-grid12.td-layout-column-last > div.td-layout-row > div > div.td-target-creditcards > table > tbody > tr:nth-child(2) > th > strong > a", (e1) => e1.click());

    await page.waitForNavigation({waitUntil: 'networkidle2'});


    const lastStatementBalance =  await page.evaluate(() => document.querySelector('#mainContent > div.treetop.ccaa > ezw-cc-account-summary > div > div.secondary-info.columnView.ng-star-inserted > div:nth-child(1) > div.sectionColumn2.summary__content > div.uf-display4.tduf-s.summary__content.ng-star-inserted').innerText);
    // console.log(lastStatementBalance);
    await browser.close();
    return lastStatementBalance;
}

module.exports = getCreditBalance;

// getCreditBalance();

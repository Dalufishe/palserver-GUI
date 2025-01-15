const cheerio = require('cheerio');
const fs = require('fs/promises');
const path = require('path');
const puppeteer = require('puppeteer');

const lan = true;
const lans = ['en', 'tw', 'cn', 'ja', 'fr'];

async function main() {
  if (!lan) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://paldb.cc/en/Pals', {
      waitUntil: 'networkidle2',
      headless: true,
    });
    const data = await page.evaluate(() => {
      return document.querySelector('body').innerHTML;
    });

    const items = {};

    // const html = await fs.readFile(path.join(__dirname, 'palsweb.html'), {
    //   encoding: 'utf-8',
    // });
    const $ = cheerio.load(data);

    // eslint-disable-next-line array-callback-return
    $('.col').map((_, col) => {
      const id = $(col).find('a').attr('data-hover').split('/')[1]; // code
      const name = $(col).find('.itemname').text();
      const image = $(col).find('img').attr('src');
      items[id] = { id, name, image };
    });

    fs.writeFile(path.join(__dirname, 'pals.json'), JSON.stringify(items), {
      encoding: 'utf-8',
    });
    await browser.close();
  } else {
    lans.forEach(async (l) => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`https://paldb.cc/${l}/Pals`, {
        waitUntil: 'networkidle2',
        headless: true,
      });
      const data = await page.evaluate(() => {
        return document.querySelector('body').innerHTML;
      });

      const items = {};

      // const html = await fs.readFile(path.join(__dirname, 'palsweb.html'), {
      //   encoding: 'utf-8',
      // });
      const $ = cheerio.load(data);

      // eslint-disable-next-line array-callback-return
      $('.col').map((_, col) => {
        const id = $(col).find('a').attr('data-hover').split('/')[1]; // code
        const name = $(col).find('.itemname').text();

        items[id] = name;
      });

      fs.writeFile(
        path.join(__dirname, `pals_${l}.json`),
        JSON.stringify(items),
        {
          encoding: 'utf-8',
        },
      );
      await browser.close();
    });
  }
}

main();

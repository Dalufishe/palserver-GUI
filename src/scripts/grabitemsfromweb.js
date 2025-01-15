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
    await page.goto('https://paldb.cc/en/Items_Table', {
      waitUntil: 'networkidle2',
      headless: true,
    });
    const data = await page.evaluate(() => {
      return document.querySelector('body').innerHTML;
    });

    const items = {};

    // const html = await fs.readFile(path.join(__dirname, 'itemsweb.html'), {
    //   encoding: 'utf-8',
    // });

    const $ = cheerio.load(data);

    // eslint-disable-next-line array-callback-return
    $('.col').map((_, col) => {
      const id = $(col).find('.flex-grow-1>div').text(); // code
      const name = $(col).find('a').text();
      const image = $(col).find('img').attr('src');
      items[id] = { id, name, image };
    });

    fs.writeFile(path.join(__dirname, 'items.json'), JSON.stringify(items), {
      encoding: 'utf-8',
    });
    await browser.close();
  } else {
    lans.forEach(async (l) => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`https://paldb.cc/${l}/Items_Table`, {
        waitUntil: 'networkidle2',
        headless: true,
      });
      const data = await page.evaluate(() => {
        return document.querySelector('body').innerHTML;
      });

      const items = {};

      // const html = await fs.readFile(path.join(__dirname, 'itemsweb.html'), {
      //   encoding: 'utf-8',
      // });

      const $ = cheerio.load(data);

      // eslint-disable-next-line array-callback-return
      $('.col').map((_, col) => {
        const id = $(col).find('.flex-grow-1>div').text(); // code
        const name = $(col).find('a').text();

        items[id] = name;
      });

      fs.writeFile(
        path.join(__dirname, `items_${l}.json`),
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

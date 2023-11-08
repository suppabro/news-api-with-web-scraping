const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://sinhala.adaderana.lk/sinhala-hot-news.php');

        const titles = await page.$$('.story-text h2 a');
        const descriptions = await page.$$('.story-text p');
        const images = await page.$$('.story-text .thumb-image a img');

        const newsList = [];

        for (let i = 0; i < titles.length; i++) {
            let title = await page.evaluate(el => el.textContent, titles[i]);
            let desc = await page.evaluate(el => el.textContent, descriptions[i]);
            let image = await page.evaluate(el => el.getAttribute("src"), images[i]);
            newsList.push({ title: title, description: desc, imgLink: image });
        }

        console.log('Scraped');
        await browser.close();
        res.send(newsList);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred during scraping.');
    }
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});

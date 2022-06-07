const express= require('express');
const app= express();
const puppeteer = require('puppeteer');
const newsList=[];
(async ()=>{
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto('http://sinhala.adaderana.lk/sinhala-hot-news.php');
    const titles = await page.$$('.story-text h2 a');
    const descriptions= await page.$$('.story-text p'); 
    const images= await page.$$('.story-text .thumb-image a img');
    for (let i = 0; i < titles.length; i++) {
        let title= await page.evaluate(el=> el.textContent, titles[i]);
        let desc = await page.evaluate(el=>el.textContent,descriptions[i]);
        let image = await page.evaluate(el=>el.getAttribute("src"), images[i]);
        newsList.push({title:title,description:desc,imgLink:image});
    }
    console.log('scraped');
    browser.close(); 
})()

app.get('/',(req,res)=>{
    res.send(newsList);
    
});

app.listen(3000, ()=>{
    console.log('server started');
});
// $=querySelector/ $$= querySelectorAll
// const attr = await page.evaluate(el => el.getAttribute("href"), styleNumber);
// let mathrukawa= await page.evaluate(el=> el.textContent, title);
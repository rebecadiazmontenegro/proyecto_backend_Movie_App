const puppeteer = require("puppeteer");
const fs = require('fs');

// Función para extraer la información de cada película
const extractMovieData = async (url, browser) => {
    try {
        const movieData = {};
        const page = await browser.newPage();
        await page.goto(url);

        // Aquí irán los selectors que tú encuentres para:
        // media de reseña y opiniones

        movieData['rating'] = await page.$eval("#content-layout > section > div > div.card.entity-card.entity-card-list.cf.entity-card-overview > div.rating-holder.rating-holder-3 > div:nth-child(1)", rating => rating.innerHTML);
        
        // opinions: suponiendo que hay varios elementos con opiniones
        // movieData['reviews'] = await page.$$eval("#pro-reviews > li:nth-child(1) > div > a > div", reviews => reviews.map(r => r.innerText).slice(0, 5)); // solo las primeras 5 opiniones

        return movieData;
    } catch (err) {
        return { error: err };
    }
}

// Función principal de scraping
const scrap = async (url) => {
    try {
        const scrapedData = [];
        console.log("Opening the browser...");
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(url);
        console.log(`Navigating to ${url}...`);

        // Capturamos los links de cada película
        const tmpurls = await page.$$eval("#top-movies .mc-title a", data => data.map(a => a.href));
        const urls = tmpurls.filter((link, index) => tmpurls.indexOf(link) === index);
        const urls2 = urls.slice(0, 5); // solo las primeras 5 películas

        console.log(`${urls2.length} links encontrados`);
        for (const movieLink in urls2) {
            const movie = await extractMovieData(urls2[movieLink], browser);
            scrapedData.push(movie);
        }

        await browser.close();

        fs.writeFile('scrapedMovies.json', JSON.stringify(scrapedData, null, 2), (err) => {
            if (err) throw err;
            console.log('Datos guardados en scrapedMovies.json');
        });

        return scrapedData;
    } catch (err) {
        console.log("Error:", err);
    }
}

// Prueba de scraping
scrap("https://www.sensacine.com/peliculas/todas-peliculas/").then(data => {
    console.log(data);
});

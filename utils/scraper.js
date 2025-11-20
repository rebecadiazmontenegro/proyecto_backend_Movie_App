const puppeteer = require("puppeteer");
const fs = require('fs');
const {createMovieService} = require("../services/movies.service");
// Función para extraer la información de cada película
const extractMovieData = async (url, browser) => {
    try {
        const movieData = {};
        const page = await browser.newPage();
        await page.goto(url);
        // Aquí irán los selectors que tú encuentres para:
        // media de reseña y opiniones
        //Titulo pelicula
        movieData['Title'] = await page.$eval(".meta-title-link", title => title.innerHTML);
        //Year
        const date = await page.$eval(".date", date => date.innerHTML);
        const year = date.match(/(\d{4})/);
        movieData['Year'] = year[0];
        //Runtime
        const info = await page.$eval(".meta-body-info", info => info.innerHTML);
        const runtime = info.match(/(\d+h \d+min)/);
        movieData['Runtime'] = runtime?runtime[0]:"--";
        //Genre
        movieData['Genre'] = await page.$eval(".dark-grey-link", genre => genre.innerHTML);
        //Director
        const directors = await page.$$eval('.meta-body-item.meta-body-direction a',dirs => dirs.map(d => d.innerText.trim()));
        movieData['Director'] = directors.join();
        //Actors
        const actors = await page.$$eval('.meta-body-actor a', links => links.map(a => a.innerText.trim()));
        movieData['Actors'] = actors.join();
        //Plot
        let plot = await page.$eval(".content-txt", el => el.innerText.trim());
        movieData['Plot'] = plot.length > 200
            ? plot.substring(0, 200) + "..."
            : plot;
        // Country
        movieData['Country'] = "--";
        // Poster
        movieData['Poster'] = await page.$eval("figure > a > img", img => img.src);
        //Rating
        const rating = await page.$eval(".stareval-note", rating => rating.innerHTML);
        movieData['imdbRating'] = Number(rating.replace(',', '.'));
        //Opinions
        movieData['Opinions'] = await page.$$eval(".review-card-content", reviews => reviews.map(r => r.innerText).slice(0, 6));
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
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url);
        console.log(`Navigating to ${url}...`);
        // Capturamos los links de cada película
        const tmpurls = await page.$$eval("#content-layout .meta h2 a", data => data.map(a => a.href));
        const urls = tmpurls.filter((link, index) => tmpurls.indexOf(link) === index);
        const urls2 = urls.slice(0, 15); //primeras 15 películas
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
    console.log(data)
    // aquí podríamos guardar los datos (por ejemplo) en la base de datos con mongoose
    // Ejemplo:
    // Product.insertMany(data).then(()=>{
    //     console.log("Productos guardados en la base de datos")
    // }).catch(err=>console.log(err))
    for (let i = 0; i < data.length; i++) {
            createMovieService(data[i])
            .then(res=>console.log(res))
            .catch(err=>console.log(err));;
    }
});

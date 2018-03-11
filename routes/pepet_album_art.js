const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true


    });
    const page = await browser.newPage();

    var query= encodeURI('pink what about us album art')
    await page.goto('https://www.google.co.kr/search?q='+ query + '&dcr=0&tbm=isch&source=iu&ictx=1&fir=6VaCUPcyhIsZvM%253A%252CMshOIwMpwui8KM%252C_&usg=__jBNdgISvH-_qdiws6zKBm1Khl54%3D&sa=X&ved=0ahUKEwiIqIGx8tvZAhVBuJQKHUunC-kQ9QEIJzAA#imgrc=6VaCUPcyhIsZvM:');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {


        $('.rg_ic').first()[0].click();

        await new Promise(function(resolve) {
            setTimeout(resolve, 1000)
        });

        var link = $('img[class=irc_mi]').attr('src')



        var resultsJson = [];

        resultsJson.push({
            "link": link

        })

        return resultsJson;


    });

    /*await browser.close();*/

    console.log('##############', dimensions);


})();
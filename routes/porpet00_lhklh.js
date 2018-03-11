const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });

    function delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time)
        });
    }

    const page = await browser.newPage();
    await page.goto('http://gs25.gsretail.com/gscvs/ko/products/event-goods#;');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const dimensions = await page.evaluate(async () => {


        var resultsJson = [];


        var i=1;
        $('.tblwrap  >.prod_list > li ').each(function () {

            var img = $(this).find('.img').children().attr('src');
            var tit = $(this).find('.tit').html()
            var cost = $(this).find('.cost').html()

            cost = cost.replace('<span>', '').replace('</span>', '').trim();


            if ( i <=8 ){

                resultsJson.push({
                    img: img
                    , tit: tit
                    , cost: cost
                })
            }


            i++;
        });

        return resultsJson;


    });

    /*await browser.close();*/

    console.log('', dimensions.length);

    console.log('', dimensions);


})();
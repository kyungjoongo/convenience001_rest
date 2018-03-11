const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true


    });
    const page = await browser.newPage();
    await page.goto('http://cu.bgfretail.com/event/plusAjax.do?listType=1&searchCondition=&user_id&pageIndex=3');
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.3.1.js'})

    const dimensions = await page.evaluate(async () => {

        let resultsJson = [];


        $('ul >  li ').each(function () {

            var image = $(this).find('.photo').children().children().attr('src')

            var prodName = $(this).find('.prodName').text();
            var prodPrice = $(this).find('.prodPrice').text();
            var type = $(this).find('.prodPrice').next().children().text();


            resultsJson.push({
                image: image,
                prodName: prodName,
                prodPrice:prodPrice,
                type:type

            })
        });

        return resultsJson;


    });


    /*await browser.close();*/

    console.log('##############', dimensions);


})();
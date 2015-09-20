var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

    // The URL we will scrape from - in our example Anchorman 2.

    var dAirport = 'STL';
    var aAirport = 'DTT';
    var oDate = '20151003';
    var iDate = '20151004';
    url = 'http://www.tripadvisor.com/CheapFlights?geo=1&pax0=a&travelers=1&cos=0&nonstop=no&airport0='+dAirport+'&nearby0=no&airport1='+aAirport+'&nearby1=no&date0='+oDate+'&time0=0024&date1='+iDate+'&time1=0024';
    
    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var airline, outbound, inbound, duration, price, link;
            var json = { airline : "", outbound : "", inbound : "", duration : "", price : "", link : ""};

            // // check if page has loaded using the loading header
            // if (!$("div.searchProgressBar").css('display') == 'none'))
            // {

            // }
            console.log("Retrieved the webpage");
            airline =  $(".carrier-name").text();
            outbound = $("span.de").first().text();
            inbound = $("span.ar").first().text();
            duration = $("span.du").first().text();
            price = $("span.price").first().text();
            console.log($(this).children())

            console.log(airline + " " + outbound + " " + inbound + " " + duration + " " + price);

            // $('.header').filter(function(){
            //     var data = $(this);
            //     title = data.children().first().text();
            
            //     release = data.children().last().children().text();

            //     json.title = title;
            //     json.release = release;
            //     console.log('Title: ' + title + " Release: " + release + " Rating: " + rating);
            // })

            // // Since the rating is in a different section of the DOM, we'll have to write a new jQuery filter to extract this information.

            // $('.star-box-giga-star').filter(function(){
            //     var data = $(this);

            //     // The .star-box-giga-star class was exactly where we wanted it to be.
            //     // To get the rating, we can simply just get the .text(), no need to traverse the DOM any further

            //     rating = data.text();

            //     json.rating = rating;
            // })
        }
    })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
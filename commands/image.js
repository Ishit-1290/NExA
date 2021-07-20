const fs = require('fs');
module.exports = {
    name: 'image',
    description: "this is a image command",
    execute(message, args, cheerio, request){
        args[0] = args.join("%20");
        
        let options = {
            url: `https://yandex.com/images/search?text=` + args[0],
            method: 'GET',
            headers: {
                "Accept": "text/html",
                "User-Agent": "Edge"
            }
    
        };
        console.log(options.url);

        request(options, (error, response, responseBody) => {
            if(error) {
                return;
            }
            
            $ = cheerio.load(responseBody); // responseBody is the html page which gets loaded into $ variable
    
            let links = $(".serp-item__preview a.serp-item__link img.serp-nitem__thumb");  //loads all the div and span blocks with image and link attributes
            let urls = new Array(links.length).fill(0).map((v , i) => links.eq(i).attr("src")); //selects the href element of the div or span blocks
            
            
            console.log(urls);
            
            if(!urls.length) {
                return;
            }
            
            const url = urls[Math.floor(Math.random() * (urls.length  - 6))]
            message.channel.send("http:" + url);
        })
    }
}
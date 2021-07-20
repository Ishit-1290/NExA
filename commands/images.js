
module.exports = {
    name: 'image',
    description: "this is a image command",
    execute(message, args, cheerio, request){
        args[0] = args.concat("+");
        let options = {
            url: `https://www.google.com/search?sxsrf=ALeKk02c8LxwvZJm4iUMbMMdSI7zRpk9BA%3A1615896159685&ei=X55QYOqsKdTG4-EP4OyriAE&q=${args[0]}&oq=${args[0]}&gs_lcp=Cgdnd3Mtd2l6EAMyBwgAEIcCEBQyBQgAELEDMgUILhCxAzICCAA6BwgAEEcQsAM6BAgjECc6BQgAEJECOgQIABBDOggILhCxAxCTAlCkPFjnTmD9T2gEcAJ4AIAB9gGIAewPkgEGMC4xMi4xmAEAoAEBqgEHZ3dzLXdpesgBCMABAQ&sclient=gws-wiz&ved=0ahUKEwiq2N2k4rTvAhVU4zgGHWD2ChEQ4dUDCA0&uact=5
            `,
            method: 'GET',
            headers: {
                "Accept": "text/html",
                "User-Agent": "Edge"
            }
    
        };
        request(options, (error, response, responseBody) => {
            if(error) {
                return;
            }
            const $ = cheerio.load(responseBody); // responseBody is the html page which gets loaded into $ variable
    
            let links = $(".image a.link");  //loads all the div and span blocks with image and link attributes
            
            let urls = new Array(links.length).fill(0).map((v , i) => links.eq(i).attr("href")); //selects the href element of the div or span blocks
            
            
            if(!urls.length) {
                return;
            }

            const url = urls[Math.floor(Math.random() * (urls.length  - 6))]
            message.channel.send(url);
        })
    }
}
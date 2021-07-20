module.exports = {
    name: 'def',
    description: "this is a def command",
    execute(message, args, cheerio, request, Discord){
        args[0] = args.concat(" ");
        let options = {
            url: 'http://results.dogpile.com/serp?qc=images&q=' + args[0],
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
    
            let links = $(".yuRUbf a.href");  //loads all the div and span blocks with image and link attributes
            
            let urls = new Array(links.length).fill(0).map((v , i) => links.eq(i).attr("href")); //selects the href element of the div or span blocks
            
            
            if(!urls.length) {
                return;
            }

            const resultLink = urls[0]
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#191c25').setTitle(args[0]).setURL(resultLink);
            message.channel.send(newEmbed);
        })
    }
}
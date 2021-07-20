function format(string){
    string = string.replace('/url?q=', "");
    let found = false;
    let newString = "";
    
    for(let i = 0; i < string.length; i++){
        if(string[i] == "&" && string[i+1] == "s" && string[i+2] == 'a'){
            found = true;
        }
        if(!found){
            newString = newString+string[i];
        }
        else{
            return newString;
        }
    }
}
function plushandeler(argsTemp){
    let args = [...argsTemp]
    let newString = '';
    for(let i = 0; i < args.length; i++){
        if(args[i].indexOf('+') != -1){
            for(let j = 0; j < args[i].length; j++){
                if(args[i][j] != '+'){
                    newString+=args[i][j];
                } else{
                    newString += '%2B'
                }
            }
            args[i] = newString;
            newString = '';
        }
    }
    return args
}
module.exports = {
    name: 'def',
    description: "this is a def command",
    execute(message, args, cheerio, request, Discord, fs){
        let options = {
            url: "https://google.com/search?q=" + plushandeler(args).join('+'),
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent" : "Edge"
               }
            }   
        
        request(options, (error, response, responseBody) => {
            if(error){
                return;
            }
                
            const $ = cheerio.load(responseBody);
            let links = $('.kCrYT a')                
            let urls = new Array(links.length).fill(0).map((v , i) => links.eq(i).attr("href")); 
                
            for(let i = 0; i < urls.length; i++){
                urls[i] = format(urls[i]);
            }
            const newEmbed = new Discord.MessageEmbed().setTitle(args.join(' ').toUpperCase()).setColor("#424242").setThumbnail(message.member.guild.iconURL()).setURL(urls[0]);                
                message.channel.send(newEmbed);
            }
        )
    }
}


    

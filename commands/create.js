const { GuildChannel } = require("discord.js");

module.exports = {
    name: "create",
    description: "this is the create command",
    execute(message, args){
        let channelName = args[1];
        if (args[0] == 'text') {
            
            message.guild.channels.create(channelName,{
                type: 'text'
            })
            .then((channel) => {
                
                channel.setParent(message.channel.parentID)
            });
        } else if(args[0] == 'voice') {
            message.guild.channels.create(channelName,{
                type: 'voice'
            })
            .then((channel) => {
                
            });
        }else{
            message.channel.send('SORRY, Can\'t create channel because type of channel was not valid.' )
        }

    }
}
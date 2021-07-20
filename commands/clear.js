const { Channel } = require("discord.js")

module.exports = {
    name: "clear",
    description: "this is a clear command",
    execute(message, args){
        let channelName = message.channel.name;
        message.channel.delete();
        
        message.guild.channels.create(channelName,{
            type: 'text'
        })
        .then((channel) => {
            const categoryID = message.channel.parentID;
            channel.setParent(categoryID);
        });
    }
}
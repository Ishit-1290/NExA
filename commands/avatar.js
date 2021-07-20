module.exports = {
    name:"avatar",
    description: "this is a avatar command",
    execute(message, args){
        if(!args[0]){
            message.channel.send(message.author.avatarURL());
        }
        else{
            message.channel.send(message.mentions.members.first().user.avatarURL());
        }
    }

}

module.exports = {
    name: 'help',
    description: 'this is a help command',
    execute(message, args, Discord, prbot){

        const newEmbed = new Discord.MessageEmbed().setColor('#191c25').setTitle('Commands').addFields(
            {name: "General Commands" , value: '`' + prbot.prefix + 'date[or]time` : tells you the exact time\n`' + prbot.prefix + 'avatar [@user]` : gives the avatar\n`' + prbot.prefix + 'clear` : for clearing messages in channel\n`' + prbot.prefix + 'create text[or]voice [Channel name]` : to create text or voice channel\n`' + prbot.prefix + 'roleadd [@user] [@role]` : to give a role to someone\n`' + prbot.prefix + 'rolesnatch [@user] [@role]` : to remove a role from someone\n`' + prbot.prefix + 'image [thing]` : gives you the image of the thing'},{
                name: 'Music Commands', value: '`' +prbot.prefix + 'play [song name]` : for playing song\n`' + prbot.prefix + 'stop[or]pause` : to pause the running song\n`' + prbot.prefix + 'skip` : to skip songs\n`' + prbot.prefix + 'resume` : to resume the songs\n`' + prbot.prefix + 'remove [index]` : to remove the song in the queue\n`' + prbot.prefix + 'disconnect` : to disconnect the bot from voice channel'
        },
        )
        .setImage('https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/105338127/original/4a553e03efce463b9c0abcd5d7ac3f8861eeef2b/draw-your-pet-in-low-poly-art-vector.png').setFooter('It also serves as a welcomer bot.');

        message.author.send(newEmbed);
    }
}
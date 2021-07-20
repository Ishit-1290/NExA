// ---- Dependencies --------------------------------------------------------------------------------
const Discord = require('discord.js');
const prbot = require('./locked.json');
const Canvas = require('canvas');
const fs = require('fs');
const { Player } = require('discord-player');
const cheerio = require('cheerio');
const request = require('request');
// --------------------------------------------------------------------------------------------------

// ---- The Actual Bot ------------------------------------------------------------------------------
const client = new Discord.Client();
// --------------------------------------------------------------------------------------------------

// ---- makes a collection and assigns the commands and to them -------------------------------------


client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

const player = new Player(client)
client.player = player;

for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}
// ---------------------------------------------------------------------------------------------------
// ---- Status ---------------------------------------------------------------------------------------
client.once("ready", ()=> {
    console.log(`${prbot.name} is Online!`)
    let status = prbot.prefix + 'help'
    client.user.setActivity(status, { type: 'LISTENING' })


})
// ---------------------------------------------------------------------------------------------------

// ---- Reaction Role --------------------------------------------------------------------------------
client.on('messageReactionAdd' , async (reaction, user) => {
})
// ---------------------------------------------------------------------------------------------------



// ---- Music ----------------------------------------------------------------------------------------
client.player.on('trackStart' , (message, track) => {
    const newEmbed = new Discord.MessageEmbed().setTitle(`Now Playing ${track.title} [Requested by ${message.author.username}]`).setColor('#424242').setURL(`${track.url}`).setDescription(`${track.duration}`).setThumbnail(client.user.displayAvatarURL());

    message.channel.send(newEmbed);
})
.on('trackAdd' , (message,queue ,track) => {
    const newEmbed = new Discord.MessageEmbed().setTitle(`${track.title} [Requested by ${message.author.username}] is added in the queue.`).setColor('#424242').setURL(`${track.url}`).setDescription(`${track.duration}`).setThumbnail(client.user.displayAvatarURL());
    message.channel.send(newEmbed);
})
.on('musicStop', () =>{
    message.channel.send('**STOPPED**');
})
.on('queueEnd', async(message, queue) =>{
    message.channel.send('QUE END')
})
// ---------------------------------------------------------------------------------------------------

// ---- Welcomer -------------------------------------------------------------------------------------
client.on('guildMemberAdd', member => {
    client.commands.get('welcomer').execute(member, Canvas, Discord)
})
// ---------------------------------------------------------------------------------------------------


client.on('message', async (message)=> {
    if (!(message.content.startsWith(prbot.prefix)) || message.author.bot) {
        return        
    }
    
    const temp = message.content.slice(prbot.prefix.length).split(" ");
    const args = [];

    for(let i = 0; i < temp.length ; i++){
        if (typeof temp[i] == "string") {
            args.push(temp[i].toLowerCase());
        }
    }
    
    
    const command = args.shift().toLowerCase();
    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if(command === 'log'){
        console.log(message.content);
    } else if(command === 'date' || command === 'time'){
        client.commands.get('date').execute(message, args);
    } else if(command === 'avatar'){
        client.commands.get('avatar').execute(message, args);
    } else if(command === 'clear' || command === 'delete' || command === 'nuke'){
        client.commands.get('clear').execute(message, args)
    } else if(command === 'create' ){
        client.commands.get('create').execute(message, args);
    } else if(command === 'help'){
        client.commands.get('help').execute(message, args, Discord, prbot);       
    } else if(command === 'roleadd'){
        client.commands.get('roleadd').execute(message);
    } else if(command === 'rolesnatch'){
        client.commands.get('gif').execute(message, args, cheerio, request);
        client.commands.get('rolesnatch').execute(message);
    } else if(command === 'image'){
        client.commands.get('image').execute(message, args, cheerio, request);
    } else if(command === 'memecreate'){
        let meme_template = ['./meme_templates/1.jpg']

        for(const file of meme_template)
        {
            message.channel.send(file.split('/')[2], {
                files:[
                    file,
                ],
            });
        }
        
    } else if(command === 'join'){
        client.emit('guildMemberAdd' , message.member);
    }
    else if(command === 'play'){
        const args_new = args.join();
        client.commands.get('music').execute(message, args_new, command, client, Discord)
    } else if(command === 'pause'){ 
        client.commands.get('music').execute(message, args, command, client, Discord)
    } else if(command === 'stop'){ 
        client.commands.get('music').execute(message, args, 'pause', client, Discord)
    } else if(command === 'disconnect'){ 
        client.commands.get('music').execute(message, args, 'stop', client, Discord)
        const newEmbed = new Discord.MessageEmbed().setTitle(`BYE.... :wave:`).setColor('#424242').setThumbnail(client.user.displayAvatarURL());
        message.channel.send(newEmbed)
    } else if(command === 'skip'){
        client.commands.get('music').execute(message, args, command, client, Discord)
    } else if(command === 'resume'){ //embed
        client.commands.get('music').execute(message, args, command, client, Discord)
    } else if(command === 'seek'){
        client.commands.get('music').execute(message, args, command, client, Discord)
    } else if(command === 'remove'){
        let queue = client.player.getQueue(message);
        console.log(args[0]-1);
        console.log(queue);
        const newEmbed = new Discord.MessageEmbed().setTitle(`${queue.tracks[args[0]-1].title} is removed`).setThumbnail(client.user.displayAvatarURL());
        client.commands.get('music').execute(message, args, command, client, Discord)
        message.channel.send(newEmbed);
    } else if(command === 'fetchmessage') {
        const fetchmessage = await message.channel.messages.fetch(args[0]);
        console.log(fetchmessage);
        console.log(fetchmessage.embeds[0].thumbnail)
    } else if(command === 'def'){
        console.log('def');
        client.commands.get('def').execute(message, args, cheerio, request, Discord);
    }
    
})

client.login(prbot.token)
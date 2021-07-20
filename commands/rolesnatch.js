module.exports = {
    name: 'rolesnatch',
    description: "this is a rolesnatch command",
    async execute(message){
        if(!message.member.hasPermission('MANAGE_ROLES')) return message.reply("Sorry Pal, you don't have the permission to do that.");
        let rMember = message.guild.member(message.mentions.users.first());
        if(!rMember) return message.reply('Couldn\'t find that user.');

        let role =  message.mentions.roles.first();
        if(!role) {
            message.reply("Specify the role, man.")
        }

        if(!rMember.roles.cache.get(role.id)) return message.reply(`${rMember.user.username} already doesn't has that role.`);
        
        try{
            await rMember.roles.remove(role);
            message.channel.send(`<@&${role.id}>is been snatched from <@${rMember.id}> role`);
        } catch(e){
            message.reply('Can\'t snatch role with position higher than mine.');
        }
    }
}
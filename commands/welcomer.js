const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px Blackadder ITC`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};
module.exports = {
    name:"welcomer",
    description: "this is a welcomer command",
    execute: async (member, Canvas, Discord) => {
            const channel = member.guild.channels.cache.find(ch => ch.name.toLowerCase().includes('welcome'))
            
        if(!channel) return;

        const canvas = Canvas.createCanvas(700, 250); //width , height
        const ctx = canvas.getContext('2d');

        const whiteoutline = await Canvas.loadImage('./white.jpg');
        ctx.drawImage(whiteoutline, 0, 0, canvas.width, canvas.height)

        const background = await Canvas.loadImage('./Wallpaper.png')
        console.log(canvas.width, canvas.height);
        ctx.drawImage(background, 5, 5, canvas.width-10, canvas.height-10); //image, x axis from start, y axis from start, width, height {-10 because width of image is canvas.width+5 }

        ctx.strokeStyle = '#74037b';
        
        ctx.strokeRect(0, 0, canvas.width, canvas.height);//x axis from start, y axis from start, x axis for end, y axis for end

        ctx.font = '28px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`Welcome to ${member.guild.name},`, canvas.width / 2.5, canvas.height / 3.5);
    

        ctx.font = applyText(canvas, member.displayName);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(member.displayName, canvas.width/ 2.5, canvas.height /1.8);

        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI* 2, false) //x coordinate of the center, y coordinate , radius, sAngle, eAngle, counterClockwise or clockwise
        
        ctx.closePath();
        ctx.clip();

        const white = await Canvas.loadImage('./white1.jpg');
        ctx.drawImage(white, 25, 0, 200, canvas.height);//image , 

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: 'jpg'}));

        ctx.beginPath();
        ctx.arc(125, 125, 90, 0, Math.PI* 2, false) //x coordinate, y coordinate , radius, sAngle, eAngle, counterClockwise or clockwise
        ctx.closePath();
        ctx.clip();
        
        
        ctx.drawImage(avatar, 25, 0, 200, canvas.height);         
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
        
        const newEmbed = new Discord.MessageEmbed().setColor('#191c25').setTitle(`Welcome Mr.${member.user.username}`).setDescription(`Welcome to ${member.guild.name}!. We hope you have good time ahead.\n We are currently having ${member.guild.memberCount} members including you.`)
        .attachFiles(attachment).setImage('attachment://welcome-image.png').setThumbnail(member.guild.iconURL())
        
        channel.send(newEmbed);
    }
}
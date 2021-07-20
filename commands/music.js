let isPlaying = false;
module.exports = {
    name: 'music',
    description: "this is a music command",
    execute(message, args, command, client, Discord){
        if(command === 'play'){
            if(!message.member.guild){ 
                message.author.send('You are not the member of the guild.');
                return;
            } else if(!message.member.voice.channel){
                message.channel.send('You are not connected to a voice channel.');
                return;
            }
            client.player.play(message, args, true);
            isPlaying = true;
            
        } else if(command === 'pause'){
            if(isPlaying){
                client.player.pause(message);
                isPlaying = false;
            }
            else{
                message.channel.send('No song is being played currently.')
            }
        } else if(command === 'stop'){
                client.player.stop(message);

        } else if(command === 'skip'){
                client.player.skip(message);

        } else if(command === 'remove'){
            let removed = client.player.remove(message, args[0]);
            
            return removed;
        } else if(command === 'resume'){
            if(!isPlaying){
                client.player.resume(message);
                isPlaying = true;
            }
            else{
                message.channel.send('I am already playing.')
            }
        } else if(command === 'seek'){
            if(isPlaying){
                
            }
        }
    }
}
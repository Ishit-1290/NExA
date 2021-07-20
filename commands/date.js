const date = new Date();

module.exports = {
    name: 'date',
    description: "this is a date command",
    execute(message, args){
        message.channel.send(date.getDate() + '/' + (date.getMonth()+1)+'/' + date.getFullYear()
        + '\n' +(date.getHours() + ':' + date.getMinutes()))

    }
}
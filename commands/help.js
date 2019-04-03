const CONFIG = require('../config.json')

const run = (client, message, args) => {
    let embed = {
        color: 0xB1103C,
        title: `Lista de comandos ${CONFIG.botName}`,
        url: 'https://github.com/brunohgv/ruralinda-bot',
        description: 'Lista com todos os comandos',
        footer: {
            text: `Ajude a construir a ${CONFIG.botName}: ${CONFIG.botRepo}`
        },
        fields: []
    }

    client.commands.forEach(command => {
        embed.fields.push({
            name: `${process.env.PREFIX}${command.help.name}`,
            value: `Descrição: ${command.help.description}\nComo usar: ${process.env.PREFIX}${command.help.usage}`
        })
    })

    message.author.send({embed: embed})
        .then(() => message.react('👍'))
        .then(() => message.reply('Mandei no privado, bb!'))
        .catch(() => message.reply('Desculpa! Não permissão para mandar mensagens privadas para você.'))
}



module.exports = {
    run: run,
    conf: {},
    help: {
        name: 'help',
        category: 'Help',
        description: `Apresenta todos os comandos conhecidos pela ${CONFIG.botName}`,
        usage: 'help'
    }
}
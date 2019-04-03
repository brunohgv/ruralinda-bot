const CONFIG = require('../config.json')

const run = (client, message, args) => {
    let content = `Oi!
Eu sou a ${CONFIG.botName}, o robô responsável por esse servidor.
Quer saber mais sobre mim? Só acessar o Tind... opa, o repositório: ${CONFIG.botRepo} e ver a documentação.
Se preferir, pode digitar \`!help\` para saber os comandos que eu aprendi :blush:`

    message.reply(content)
        .then(() => message.react('👍'))
        .catch(() => message.reply('Desculpa! Não permissão para mandar mensagens privadas para você.'))
}



module.exports = {
    run: run,
    conf: {},
    help: {
        name: 'about',
        category: 'About',
        description: `Apresenta a ${CONFIG.botName}`,
        usage: 'about'
    }
}
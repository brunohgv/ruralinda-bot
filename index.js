const Discord = require('discord.js')
const client = new Discord.Client()

const CONSTANTS = require('./common-info.json')

require('dotenv').config()

client.on('ready', () => {
	console.log(`logged in as ${client.user.tag}`)
})

client.on('message', msg => {
  if (msg.content === '!sobre') {
    msg.reply(`oi, eu sou a ${CONSTANTS.botName}!\nSaiba mais sobre mim em ${CONSTANTS.botRepo}. ;)`)
  }
});

client.login(process.env.APP_TOKEN)

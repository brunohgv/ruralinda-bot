const Discord = require('discord.js')
const minimist = require('minimist')
const { readdirSync } = require('fs')
const Enmap = require('enmap')
const client = new Discord.Client()
require('dotenv').config()
const CONFIG = require('./config.json')

client.commands = new Enmap()

const cmdFiles = readdirSync('./commands')
console.log(`Carregando ${cmdFiles.length} comandos.`)

cmdFiles.forEach(file => {
  try {
    const props = require(`./commands/${file}`)
    if (file.split('.').slice(-1)[0] !== 'js') return

    console.log('log', `Carregando comando: ${props.help.name}`)
    if (props.init) {
      props.init(client)
    }
    client.commands.set(props.help.name, props)
  } catch (e) {
    console.log(`Impossivel executar comando ${file}: ${e}`)
  }
})

const evtFiles = readdirSync('./events/')
console.log('log', `Carregando o total de ${evtFiles.length} eventos`)
evtFiles.forEach(file => {
  const eventName = file.split('.')[0]
  const event = require(`./events/${file}`)

  client.on(eventName, event.bind(null, client))
})

client.on('error', err => {
  console.log(err)
})

client.on('ready', () => {
	console.log(`logged in as ${client.user.tag}`)
})

client.login(process.env.APP_TOKEN)

const Discord = require('discord.js')
const { readdirSync } = require('fs')
const Enmap = require('enmap')
const client = new Discord.Client()
require('dotenv').config()
const CONFIG = require('./config.json')

/** Istancia uma coleção de comandos */
client.commands = new Enmap()

/** Carrega os arquivos de comandos como uma coleção */
const cmdFiles = readdirSync('./commands')
console.log(`Carregando ${cmdFiles.length} comandos.`)

/** Lê a lista de arquivos de comandos e adiciona cada comando em memória fazendo um log do que foi adicionado */
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

/** Carrega os arquivos de eventos como uma coleção */
const evtFiles = readdirSync('./events/')
console.log('log', `Carregando o total de ${evtFiles.length} eventos`)

/** Lê a lista de arquivos de eventos e adiciona cada evento em memória fazendo um log do que foi adicionado */
evtFiles.forEach(file => {
  const eventName = file.split('.')[0]
  const event = require(`./events/${file}`)

  client.on(eventName, event.bind(null, client))
})

/** Faz o log de qualquer evento de erro */
client.on('error', err => {
  console.log(err)
})

/** Executa assim que o bot é iniciado */
client.on('ready', () => {
	console.log(`logged in as ${client.user.tag}`)
})

client.login(process.env.APP_TOKEN)

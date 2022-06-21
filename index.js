const server = require('./modules/server.js'); 
const file = require('fs');
const webSocet = require('ws');

const webClients = [];
const rooms = [];

const socet = new webSocet.Server({port: 9000});
socet.on('connection', (wsClient) => { 
    console.log(`Socet: client connected`);
    wsClient.on('message', (message) => {
        message = JSON.parse(message);
        if(message.type === "Connect-log"){
            if(webClients.every(item => item.name !== message.name)){
                const client = {
                    name: message.name,
                    socet: wsClient
                }
                webClients.push(client);
                console.log(`Socet: client ${message.name} connected ${webClients.length}`);
            }
        }
        if(message.type === "Message"){
            webClients.forEach(item => {
                if(item.name !== message.name){
                    item.socet.send(`${message.name}: ${message.text}`);
                }
            })
        }
    })

    wsClient.on('close', function(event, reason){
        const client = webClients.splice(webClients.findIndex(item => item.socet === this, 1));
        console.log(`Socet: client ${client[0].name} disconected ${webClients.length}`);
    })
    
})

const parameter = JSON.parse(file.readFileSync('./options.json', 'utf8'));



server(parameter.sourceDirectory).listen(parameter.serverPort, err => {
    if(err){
        console.log(err);
        return;
    }
    console.log(`Sever is runing on port:${parameter.serverPort}.....`);
})
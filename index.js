const server = require('./modules/server.js'); 
const file = require('fs');

const parameter = JSON.parse(file.readFileSync('./options.json', 'utf8'));



server(parameter.sourceDirectory).listen(parameter.serverPort, err => {
    if(err){
        console.log(err);
        return;
    }
    console.log(`Sever is runing on port:${parameter.serverPort}.....`);
})
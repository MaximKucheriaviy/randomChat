let socet;
let name;
const chatField = document.querySelector('.message-container');


function createConnectLog(){
    name = prompt("Add name");
    const message = {
        type: "Connect-log",
        name
    }
    return message;
}

function createMessage(text){
    const message = {
        type: "Message",
        name,
        text
    }
    return message;
}

document.querySelector('.connect-button').onclick = (event) => {
    console.log("Socet open");
    socet = new WebSocket('ws:/192.168.0.101:9000');

    socet.onopen = (event) => {
        socet.send(JSON.stringify(createConnectLog()));
    }

    socet.onmessage = (event) => {
        const field = document.createElement('p');
        field.textContent = event.data;
        chatField.append(field);
    }
}

document.querySelector('.send-button').onclick = (event) => {
    event.preventDefault();
    if (socet) {
        const data = new FormData(document.forms.textInputForm);
        console.log(data.get("message"));
        const field = document.createElement('p');
        field.textContent = `${name}: ${data.get("message")}`;
        chatField.append(field);
        socet.send(JSON.stringify(createMessage(data.get("message"))));
    }
}

document.querySelector('.disconnect-button').onclick = (event) => {
    if (socet) {
        console.log("Socet cosed");
        socet.close();
    }
}
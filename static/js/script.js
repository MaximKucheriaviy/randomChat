let socet;
let name;

function createConnectLog(){
    name = prompt("Add name");
    const message = {
        type: "Connect-log",
        name
    }
    return message;
}

function createMessage(){
    const text = prompt("Add message");
    const message = {
        type: "Message",
        name,
        text
    }
    return message;
}

document.querySelector('.connect-button').onclick = (event) => {
    console.log("Socet open");
    socet = new WebSocket('ws:/localhost:9000');

    socet.onopen = (event) => {
        socet.send(JSON.stringify(createConnectLog()));
    }

    socet.onmessage = (event) => {
        alert(event.data);
    }
}

document.querySelector('.send-button').onclick = (event) => {
    socet.send(JSON.stringify(createMessage()));
}

document.querySelector('.disconnect-button').onclick = (event) => {
    console.log("Socet cosed");
    socet.close();
}
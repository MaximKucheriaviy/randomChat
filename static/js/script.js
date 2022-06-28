let socet;
let userName;
const windows = {
    loginWindow: document.querySelector('.start-section'),
    chatRoom: document.querySelector('.chat-room')
}

function createConnectLog(){
    const message = {
        type: "Connect-log",
        name: userName
    }
    return message;
}

function createMessage(text){
    const message = {
        type: "Message",
        name: userName,
        text
    }
    return message;
}

document.querySelector('.login-form__button').onclick = (event) => {
    event.preventDefault();
    userName = new FormData(document.forms.login).get('username');
    if(userName === ""){
        alert("Введите имя пользователя");
        return;
    }
    console.log("Socet open");
    socet = new WebSocket('ws:/192.168.1.124:9000');
    document.querySelector('.login-form').reset();
    socet.onopen = (event) => {
        socet.send(JSON.stringify(createConnectLog()));
        windows.loginWindow.classList.toggle('visually-hidden');
        windows.chatRoom.classList.toggle('visually-hidden');
    }

    socet.onmessage = (event) => {
        console.log(event);
        const arr = event.data.split(": ")
        createMessageBlock(arr[0], arr[1]);
    }
}

document.querySelector('.send-message-button').onclick = (event) => {
    event.preventDefault();
    if (socet) {
        const data = new FormData(document.forms.messageForm);
        console.log(data.get("message"));
        createMessageBlock(userName, data.get("message"), true);
        socet.send(JSON.stringify(createMessage(data.get("message"))));
    }
}

// document.querySelector('.disconnect-button').onclick = (event) => {
//     if (socet) {
//         console.log("Socet cosed");
//         socet.close();
//     }
// }

function createMessageBlock(author, text, oun = false){
    const block = document.createElement('div');
    if(oun){
        block.classList.add("message-block-oun");
    }
    else{
        block.classList.add("message-block-other");
    }
    const message = document.createElement('div');
    message.classList.add('message-text-block')
    message.textContent = `${author}: ${text}`;
    block.append(message);
    document.querySelector('.chatblock').append(block);
}

let socet;
let userName;
const windows = {
    loginWindow: document.querySelector('.start-section'),
    chatRoom: document.querySelector('.chat-room'),
    loadingScreen: document.querySelector('.loading-screen')
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
    console.log("Socet open", window.location.hostname);
    socet = new WebSocket(`ws:/${window.location.hostname}:9000`);
    document.querySelector('.login-form').reset();
    socet.onopen = (event) => {
        socet.send(JSON.stringify(createConnectLog()));
        windows.loginWindow.classList.toggle('visually-hidden');
        windows.chatRoom.classList.toggle('visually-hidden');
        loadingAnimation.runAnimation();
    }

    socet.onmessage = (event) => {
        const message = JSON.parse(event.data);
        switch(message.type){
            case "Message":
                const arr = message.message.split(": ")
                createMessageBlock(arr[0], arr[1]);
                break;
            case "Start-chating":

                break;
        }

    }
}

document.querySelector('.send-message-button').onclick = (event) => {
    event.preventDefault();
    if (socet) {
        const data = new FormData(document.forms.messageForm);
        console.log(data.get("message"));
        if(data === ""){
            return;
        }
        createMessageBlock(userName, data.get("message"), true);
        socet.send(JSON.stringify(createMessage(data.get("message"))));
        document.forms.messageForm.reset();
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


  

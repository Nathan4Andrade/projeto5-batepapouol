// configurar acesso
axios.defaults.headers.common["Authorization"] = "pKisH8gPaANz2G2fyeed5Zki";

let message = [];

let username = {
  name: "",
};

usernameLogin();
searchMessages();

//fazer o enter funcionar
document
  .querySelector(".input-message")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

// logar usuário FUNCIONA
function usernameLogin() {
  username.name = prompt("Qual seu username?");
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/vm/uol/participants",
    username
  );
  promise.then(online);
  promise.catch(errorUsername);
}

// usuário online
function online() {
  sendStatus();
  setInterval(sendStatus, 5000);
  searchMessages();
  setInterval(searchMessages, 3000);
}

// tratar erro do usuário
function errorUsername(error) {
  console.log(error.response);
  if (error.response.status === 400) {
    alert(`Usuário em uso, por favor escolha outro`);
    window.location.reload();
  }
  if (error.response.status === 404) {
    alert(`Erro 404 - Not Found`);
    window.location.reload();
  }
}

// envia o status entrar e sair da sala
function sendStatus() {
  const promisePOST = axios.post(
    "https://mock-api.driven.com.br/api/vm/uol/status",
    username
  );
  promisePOST.then(connectedUser);
  promisePOST.catch(errorConnection);
}

function connectedUser() {
  console.log("Usuário conectado!");
}

function errorConnection() {
  console.log("Erro na conexão!");
  window.location.reload();
}

// buscar mensagens FUNCIONAAAAAAAA
function searchMessages() {
  const promise = axios.get(
    "https://mock-api.driven.com.br/api/vm/uol/messages"
  );

  promise.then(displayMessage);
  promise.catch(errorConnection);
}

//renderizar mensagens FUNCIONAAAAAAAAAA
function displayMessage(response) {
  const message = response.data;
  let messagesContainer = document.querySelector(".messages-container");

  messagesContainer.innerHTML = "";
  for (let i = 0; i < message.length; i++) {
    if (message[i].type == "status") {
      messagesContainer.innerHTML += `
      <div class="status-message" data-test="message">
        <p>
          <span class="time">(${message[i].time})</span>
          <strong class="name">${message[i].from}</strong>
          <span class="text">${message[i].text}</span>
        </p>
      </div>`;
    } else if (message[i].type == "message") {
      messagesContainer.innerHTML += `
      <div class="public-message" data-test="message">
        <p>
          <span class="time">(${message[i].time})</span>
          <strong class="name">${message[i].from}</strong>
          <span class="text">para</span>
          <span class="name">${message[i].to}:</span>
          <span class="text">${message[i].text}</span>
        </p>
      </div>`;
    } else if (message[i].type == "private_message") {
      messagesContainer.innerHTML += `
      <div class="private-message" data-test="message">
        <p>
          <span class="time">(${message[i].time})</span>
          <strong class="name">${message[i].from}</strong>
          <span class="text">para</span>
          <span class="name">${message[i].to}:</span>
          <span class="text">${message[i].text}</span>
        </p>
      </div>`;
    }
  }
  messagesContainer.lastChild.scrollIntoView();
}

//envia mesagem FUNCIONAAAAAAAAAAAAAAAAAAAAAAAAAAAA
function sendMessage() {
  const inputMessage = document.querySelector(".input-message").value;
  document.querySelector(".input-message").value = "";
  if (inputMessage == "") {
    return inputMessage;
  }
  const newMessage = {
    from: username.name,
    to: "Todos",
    text: inputMessage,
    type: "message",
  };
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/vm/uol/messages",
    newMessage
  );
  promise.then(searchMessages);
  promise.catch(errorConnection);
}

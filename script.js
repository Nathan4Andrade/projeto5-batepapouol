// configurar acesso
axios.defaults.headers.common["Authorization"] = "pKisH8gPaANz2G2fyeed5Zki";

const usuario = {
  name: "chuu do loona",
};
const messages = [{ message: "oi" }];

//renderizar mensagens

//adiciona o usuario
function addUser() {
  const promessa = axios.post(
    "https://mock-api.driven.com.br/api/vm/uol/participants",
    usuario
  );
  console.log(promessa);
  promessa.then(receberResposta());
}

//envia mesagem
function sendMessage() {
  const inputMessage = document.querySelector(".input-text");
  const newMessage = {
    from: "nome do usuário",
    to: "nome do destinatário (Todos se não for um específico)",
    text: inputMessage.value,
    type: "message",
  };
  const promessa = axios.post(
    "https://mock-api.driven.com.br/api/vm/uol/participants",
    newMessage
  );
  console.log(promessa);
  promessa.then(receberResposta());

  renderMessages();
}

function renderMessages() {
  console.log("renderizou");
}
function receberResposta() {
  console.log("mensagem enviada com sucesso");
}

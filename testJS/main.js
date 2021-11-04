
var xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.exchangerate.host/latest");

xhr.send()

xhr.addEventListener("load", () => {
  if(xhr.status == 200) {
    var resposta = xhr.responseText; // Armazenando em uma variavel
    var respostaArrumada = JSON.parse(resposta);
    console.log(resposta)
    console.log(respostaArrumada);
  }
  else {
    console.log(xhr.status);
    console.log("Ocorreu um erro ao tentar fazer a requisicao");
  }
  
});






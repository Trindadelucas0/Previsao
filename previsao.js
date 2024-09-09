const key = "c380cc3ee8809da1414f704c8a5709d0";

//transformando valores no html em tempo real com servidor
function mostrarDados(dados) {
  console.log(dados);
  document.querySelector(".city2").innerHTML = "Tempo em: " + dados.name;
  document.querySelector(".temp").innerHTML =
    Math.floor(dados.main.temp) + "°c";
  document.querySelector(".textoprevisao").innerHTML =
    dados.weather[0].description;
  document.querySelector(".Umidade").innerHTML = dados.main.humidity + "%";
  document.querySelector(
    ".img_previsao"
  ).src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}

//chamado do servidor
async function getCity(cidade) {
  const dados = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`
  ).then((resposta) => resposta.json());
  mostrarDados(dados);
}

//pegando o valor digitado
function clickButton() {
  const cidade = document.querySelector(".cidade").value;
  getCity(cidade);
}

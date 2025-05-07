/**
 * Chave de API do OpenWeatherMap
 * Necessária para fazer requisições à API de previsão do tempo
 */
const key = "c380cc3ee8809da1414f704c8a5709d0";

/**
 * Função para exibir os dados do clima na interface
 * @param {Object} dados - Objeto contendo os dados do clima retornados pela API
 */
function mostrarDados(dados) {
    try {
        // Atualiza os elementos da interface com os dados recebidos
        document.querySelector(".city2").innerHTML = `Tempo em ${dados.name}`;
        document.querySelector(".temp").innerHTML = `${Math.floor(dados.main.temp)}°c`;
        document.querySelector(".textoprevisao").innerHTML = dados.weather[0].description;
        document.querySelector(".Umidade").innerHTML = `Umidade: ${dados.main.humidity}%`;
        // Converte velocidade do vento de m/s para km/h
        document.querySelector(".vento").innerHTML = `Vento: ${Math.floor(dados.wind.speed * 3.6)} km/h`;
        document.querySelector(".sensacao").innerHTML = `Sensação: ${Math.floor(dados.main.feels_like)}°c`;
        // Usa ícone de alta resolução (@2x)
        document.querySelector(".img_previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`;

        // Adiciona animação de fade para suavizar a transição
        const weatherBox = document.querySelector(".weather-box");
        weatherBox.style.opacity = "0";
        setTimeout(() => {
            weatherBox.style.opacity = "1";
        }, 100);
    } catch (error) {
        console.error("Erro ao mostrar dados:", error);
        alert("Erro ao processar os dados do clima. Por favor, tente novamente.");
    }
}

/**
 * Função para buscar dados do clima de uma cidade específica
 * @param {string} cidade - Nome da cidade para buscar o clima
 */
async function getCity(cidade) {
    try {
        // Faz a requisição à API do OpenWeatherMap
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`
        );
        
        // Verifica se a requisição foi bem sucedida
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const dados = await response.json();
        mostrarDados(dados);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Cidade não encontrada. Por favor, verifique o nome e tente novamente.");
    }
}

/**
 * Função para processar o clique no botão de busca
 * Valida a entrada e chama a função de busca
 */
function clickButton() {
    const cidade = document.querySelector(".cidade").value.trim();
    if (cidade) {
        getCity(cidade);
    } else {
        alert("Por favor, digite o nome de uma cidade.");
    }
}

/**
 * Função para processar o evento de tecla pressionada
 * Permite buscar o clima pressionando Enter
 * @param {KeyboardEvent} event - Evento de tecla
 */
function handleKeyPress(event) {
    if (event.key === "Enter") {
        clickButton();
    }
}

// Carrega os dados do clima de São Paulo ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
    getCity("São Paulo");
});

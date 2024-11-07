// Inicializa o mapa e define a posição central e o nível de zoom
const map = L.map('map').setView([-15.812743484997265, -47.89300692050525], 12);

// Adiciona a camada do OpenStreetMap ao mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Função para carregar as lojas do backend e adicionar os marcadores ao mapa
async function carregarLojas() {
  try {
    // Faz uma requisição ao endpoint /loja para obter as lojas
    const response = await fetch('http://localhost:8080/loja');  // Substitua pela URL do seu backend
    const lojas = await response.json();

    // Itera pelas lojas e cria um marcador para cada uma
    lojas.forEach(loja => {
      const { latitude, longitude, nome } = loja;  // Extrai os dados de cada loja

      // Cria um marcador para cada loja
      L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup(`<b>${nome}</b>`)
        .openPopup();
    });
  } catch (error) {
    console.error("Erro ao carregar lojas:", error);
  }
}

// Carrega as lojas assim que o mapa for inicializado
carregarLojas();


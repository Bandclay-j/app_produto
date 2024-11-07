// Inicialize o mapa e defina a posição central e o nível de zoom
const map = L.map('map').setView([-15.812743484997265, -47.89300692050525], 16);

// Adicione a camada do OpenStreetMap ao mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Adicione um marcador em Brasília
const marker = L.marker([-15.812743484997265, -47.89300692050525])
  .addTo(map)
  .bindPopup("<b>Loja 1 de Brasília</b>")
  .openPopup();
// Inicializa o mapa uma vez, com uma posição inicial genérica
var map = L.map('map').setView([0, 0], 2); // Posição inicial

// Adiciona o tile layer do OpenStreetMap ao mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Variável para armazenar o marcador temporário
var marker = null;

// Função para buscar todas as lojas e exibi-las na tabela
function getAllLojas() {
    axios.get('http://localhost:8080/loja')
        .then(function(response) {
            var jsonData = response.data;
            var tableBody = $("table tbody");

            // Limpa o conteúdo da tabela antes de adicionar os novos dados
            tableBody.empty();

            // Adiciona cada loja à tabela
            jsonData.forEach(loja => {
                var markup = "<tr style='text-align:center'>" + 
                                "<td>" + loja.id + "</td>" +
                                "<td>" + loja.nome + "</td>" +
                                "<td class='endereco' data-lat='" + loja.latitude + "' data-lng='" + loja.longitude + "'>" + loja.endereco + "</td>" +
                                "<td>" + loja.latitude + "</td>" +
                                "<td>" + loja.longitude + "</td>" +
                                "<td>" + 
                                    "<button class='btn btn-danger' onclick='confirmarExclusao(" + loja.id + ")'>Excluir</button>" + 
                                    "<button class='btn btn-primary' onclick='editarLoja(" + loja.id + ")' style='margin-left: 10px'>Editar</button>" + 
                                "</td>" +
                            "</tr>";

                tableBody.append(markup);
            });

            // Adiciona eventos de mouseover e mouseout para exibir o mapa
            $('.endereco').on('mouseover', function(e) {
                var lat = $(this).data('lat');
                var lng = $(this).data('lng');

                // Centraliza o mapa e adiciona um marcador na localização
                map.setView([lat, lng], 15);

                // Remove o marcador antigo, se existir
                if (marker) {
                    map.removeLayer(marker);
                }

                // Adiciona um novo marcador no local
                marker = L.marker([lat, lng]).addTo(map);

                // Exibe o mapa próximo ao mouse
                $('#map').css({
                    top: e.pageY + 10,
                    left: e.pageX + 10
                }).show();
            });

            // Esconde o mapa quando o mouse sai da célula
            $('.endereco').on('mouseout', function() {
                $('#map').hide();
            });
        })
        .catch(function(error) {
            console.error("Erro ao buscar lojas:", error);
            alert("Erro ao carregar as lojas. Verifique a API.");
        });
}

// Função para confirmar exclusão
function confirmarExclusao(id) {
    if (confirm("Tem certeza que deseja excluir esta loja?")) {
        axios.delete(`http://localhost:8080/loja/${id}`)
            .then(function() {
                alert("Loja excluída com sucesso!");
                getAllLojas();
            })
            .catch(function(error) {
                console.error("Erro ao excluir loja:", error);
                alert("Erro ao excluir loja.");
            });
    }
}

// Função para editar loja
function editarLoja(id) {
    alert("Função de edição de loja ainda não implementada para o ID: " + id);
}

// Chama a função quando o documento está pronto
$(document).ready(function(){
    getAllLojas();
});

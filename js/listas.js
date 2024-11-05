function getAllProdutos() {
    axios.get('http://localhost:8080/produto')
    .then(function(response) {
        console.log(response);

        var jsonData = response.data;
        var tableBody = $("table tbody");

        jsonData.forEach(produto => {
            var markup = "<tr>" + 
                         "<td>" + produto.id + "</td>" +
                         "<td>" + produto.nome + "</td>" +
                         "<td>" + produto.preco + "</td>" +
                         "<td>" + produto.dataCadastro + "</td>" +
                         "<td>" + (produto.categoria ? produto.categoria.nome : "")+ "</td>" +
                         "<td>" + (produto.fornecedor ? produto.fornecedor.nome : "")+ "</td>" +
                         "</tr>";

            tableBody.append(markup);
        });
    })
}

function getAllCategorias() {
    axios.get('http://localhost:8080/categoria')
    .then(function(response) {
        console.log(response);

        var jsonData = response.data;
        var tableBody = $("table tbody");

        jsonData.forEach(categoria => {
            var markup = "<tr>" + 
                         "<td>" + categoria.id + "</td>" +
                         "<td>" + categoria.nome + "</td>" +
                         "</tr>";

            tableBody.append(markup);
        });
    })
}
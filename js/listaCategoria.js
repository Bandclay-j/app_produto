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
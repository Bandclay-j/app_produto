function cadastraProdutos() {
    var nome = $("#nome").val();
    var preco = $("#preco").val();
    var dataCadastro = $("#dataCadastro").val();

    axios.post('http://localhost:8080/produto', {
        "nome": nome,
        "preco": preco,
        "dataCadastro": dataCadastro
    })
    .then(function (response) {
        alert("Informações cadastrada");
        document.location = "listaProduto.html";
    })
    .catch(function (error) {
        console.log(error);
    });
}

function cadastraCategoria() {
    var nome = $("#categoria").val();

    axios.post('http://localhost:8080/categoria', {
        "Categoria": nome
    })
    .then(function (response) {
        alert("Categoria cadastrada!");
        document.location = "listaCategoria.html";
    })
    .catch(function (error) {
        console.log(error);
    });
}
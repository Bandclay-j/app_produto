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
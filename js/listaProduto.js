let produtoIdParaExcluir = null; //Variável para armazenar o ID do produto a ser excluído
let produtoIdParaEditar = null; //Variável para armazenar o ID do produto a ser editado

function getAllProdutos() {
    axios.get('http://localhost:8080/produto')
    .then(function(response) {
        console.log(response);
        var jsonData = response.data;
        var tableBody = $("table tbody");
        jsonData.forEach(produto => {
            var markup = "<tr style='text-align: center'>" + 
                         "<td>" + produto.id + "</td>" +
                         "<td>" + produto.nome + "</td>" +
                         "<td>" + produto.preco + "</td>" +
                         "<td>" + produto.dataCadastro + "</td>" +
                         "<td>" + (produto.categoria ? produto.categoria.nome : "")+ "</td>" +
                         "<td>" + (produto.fornecedor ? produto.fornecedor.nome : "")+ "</td>" +
                         "<td>" + "<button class='btn btn-danger' onclick='excluirProduto(" + produto.id + ")'>Excluir</button>" + 
                         "<button class='btn btn-primary' onclick='editarProduto(" + produto.id + ")' style='margin-left: 10px'>Editar</button>" + "</td>" +
                         "</tr>";
            tableBody.append(markup);
        });
    })
    .catch(function(error) {
        console.log(error);
    });
}

function excluirProduto(id) {
    // Armazena o ID do produto e exibe o modal de confirmação
    produtoIdParaExcluir = id;
    $('#modalExcluirProduto').modal('show');
}

document.getElementById("excluirProduto").addEventListener("click", function() {
    if (produtoIdParaExcluir) {
        // Chama a função de exclusão com o ID armazenado
        axios.delete('http://localhost:8080/produto/' + produtoIdParaExcluir)
        .then(function(response) {
            alert("Produto deletado com sucesso!");
            $('#modalExcluirProduto').modal('hide'); //Fecha o modal após a exclusão
            location.reload(); // Recarrega a página para atualizar a lista de produtos
        })
        .catch(function(error) {
            console.log(error);
            alert("Erro ao deletar o produto!");
        });
    }
});

function editarProduto(id) {
    produtoIdParaEditar = id;

    axios.get('http://localhost:8080/produto/' + id)
    .then(function(response) {
        const produto = response.data;

        document.getElementById("editarNome").value = produto.nome;
        document.getElementById("editarPreco").value = produto.preco;
        document.getElementById("editarDataCadastro").value = produto.dataCadastro;

        $('#modalEditarProduto').modal('show');
    })
    .catch(function(error) {
        console.log(error);
        alert("Erro ao buscar o produto!");
    });
}

document.getElementById("salvarAlteracoes").addEventListener("click", function() {
    const nome = document.getElementById("editarNome").value;
    const preco = document.getElementById("editarPreco").value;
    const dataCadastro = document.getElementById("editarDataCadastro").value;

    const produtoAtualizado = {
        nome: nome,
        preco: preco,
        dataCadastro: new Date().toISOString().split("T")[0]
    };

    axios.put('http://localhost:8080/produto/' + produtoIdParaEditar, produtoAtualizado)
    .then(function(response) {
        alert("Produto atualizado com sucesso!");
        $('#modalEditarProduto').modal('hide');
        location.reload();
    })
    .catch(function(error) {
        console.log(error);
        alert("Erro ao atualizar o produto!");
    });
});


const formProduto = document.getElementById("form-produto");

//inputs

const inputNome = document.getElementById("nome")
const inputQuantidade = document.getElementById("quantidade")
const inputCategoria = document.getElementById("categoria")

const listaProdutos = document.getElementById("lista-produtos")

// Arrey que guarda os produtos

const produtos = []

// Funções 

function criarProduto(nome, quantidade, categoria) {
    return {
        id: Date.now(),
        nome: nome,
        quantidade: quantidade,
        categoria: categoria
    }
}

function adicionarProduto (produto) {
    produtos.push(produto)
}

function renderizarProdutos() {
    listaProdutos.innerHTML = ""

    for (let i = 0; i < produtos.length; i++ ) {
        const produto = produtos[i]

        const itemLista = document.createElement("li")

        itemLista.textContent = 
        produto.nome +
        " | Quantidade: " + 
        produto.quantidade +
        " | Categoria: " +
        produto.categoria

        listaProdutos.appendChild(itemLista)
    }
}

// Enviar formulário

formProduto.addEventListener("submit", function (event) {

event.preventDefault();

const nome = inputNome.value;
const quantidade = Number(inputQuantidade.value);
const categoria = inputCategoria.value;

// Validação simples
if (nome === "" || quantidade <= 0) {
alert("Preencha o nome e uma quantidade válida.");
return;
}

const novoProduto = criarProduto(nome, quantidade, categoria);

adicionarProduto(novoProduto);

renderizarProdutos();


formProduto.reset();
});


// ui.js

const formProduto = document.getElementById("form-produto");

const inputNome = document.getElementById("nome");
const inputQuantidade = document.getElementById("quantidade");
const inputCategoria = document.getElementById("categoria");

const listaProdutos = document.getElementById("lista-produtos");

function obterDadosFormulario() {
  return {
    nome: inputNome.value,
    quantidade: Number(inputQuantidade.value),
    categoria: inputCategoria.value
  };
}

function limparFormulario() {
  formProduto.reset();
}

function obterClasseEstoque(quantidade) {
  if (quantidade >= 100) {
    return "estoque-alto";
  }

  if (quantidade >= 50) {
    return "estoque-medio";
  }

  return "estoque-baixo";
}

function renderizarProdutos(produtos) {
  listaProdutos.innerHTML = "";

  produtos.forEach(produto => {
    const itemLista = document.createElement("li");

    itemLista.classList.add("produto");
    itemLista.classList.add(obterClasseEstoque(produto.quantidade));

    itemLista.textContent =
      produto.nome +
      " | Quantidade: " +
      produto.quantidade +
      " | Categoria: " +
      produto.categoria;

    listaProdutos.appendChild(itemLista);
  });
}


function onSubmit(callback) {
  formProduto.addEventListener("submit", callback);
}

export {
  obterDadosFormulario,
  limparFormulario,
  renderizarProdutos,
  onSubmit
};

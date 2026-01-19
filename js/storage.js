
const STORAGE_KEY = "produtos_estoque";

const produtos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];


function criarProduto(nome, quantidade, categoria) {
  return {
    id: Date.now(),
    nome,
    quantidade,
    categoria
  };
}

function adicionarProduto(produto) {
  const produtoExistente = produtos.find(p =>
    p.nome === produto.nome &&
    p.categoria === produto.categoria
  );

  if (produtoExistente) {
    produtoExistente.quantidade += produto.quantidade;
  } else {
    produtos.push(produto);
  }

  salvarProdutos()
}


function obterProdutos() {
  return produtos;
}

export {
  criarProduto,
  adicionarProduto,
  obterProdutos
};


function salvarProdutos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
}

console.log("storage carregado")

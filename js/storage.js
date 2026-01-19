
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

function removerProduto(id) {
  const index = produtos.findIndex(produto => produto.id === id);

  if (index !== -1) {
    produtos.splice(index, 1);
    salvarProdutos();
  }
}

function salvarProdutos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
}

function saidaProduto(id, quantidadeSaida) {
  const produto = produtos.find(p => p.id === id);

  if (!produto) return false;

  if (quantidadeSaida > produto.quantidade) {
    return false;
  }

  produto.quantidade -= quantidadeSaida;

  if (produto.quantidade === 0) {
    removerProduto(id);
  } else {
    salvarProdutos();
  }

  return true;
}


export {
  criarProduto,
  adicionarProduto,
  obterProdutos,
  removerProduto,
  saidaProduto
};







const STORAGE_KEY = "produtos_estoque";
const HISTORY_KEY = "historico_estoque";

const produtos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const historico = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

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
    p.nome.toLowerCase() === produto.nome.toLowerCase() &&
    p.categoria === produto.categoria
  );

  if (produtoExistente) {
    produtoExistente.quantidade += produto.quantidade;
    registrarHistorico("entrada", produtoExistente, produto.quantidade);
  } else {
    produtos.push(produto);
    registrarHistorico("entrada", produto, produto.quantidade);
  }

  salvarProdutos();
}


function obterProdutos() {
  return produtos;
}

function removerProduto(id) {
  const index = produtos.findIndex(p => p.id === id);

  if (index !== -1) {
    const produto = produtos[index];
    registrarHistorico("remocao", produto, produto.quantidade);
    produtos.splice(index, 1);
    salvarProdutos();
  }
}

function salvarHistorico() {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(historico));
}

function salvarProdutos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
}

function saidaProduto(id, quantidadeSaida) {
  const produto = produtos.find(p => p.id === id);
  if (!produto || quantidadeSaida > produto.quantidade) return false;

  produto.quantidade -= quantidadeSaida;
  registrarHistorico("saida", produto, quantidadeSaida);

  if (produto.quantidade === 0) {
    removerProduto(id);
  } else {
    salvarProdutos();
  }

  return true;
}


function registrarHistorico(tipo, produto, quantidade) {
  historico.unshift({
    id: crypto.randomUUID(),
    tipo,
    produto: produto.nome,
    categoria: produto.categoria,
    quantidade,
    data: new Date().toLocaleString("pt-BR")
  });

  salvarHistorico();
}


function obterHistorico() {
  return historico;
}

export {
  criarProduto,
  adicionarProduto,
  saidaProduto,
  obterProdutos,
  removerProduto,
  obterHistorico
};






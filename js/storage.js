

const produtos = [];

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
}


function obterProdutos() {
  return produtos;
}

export {
  criarProduto,
  adicionarProduto,
  obterProdutos
};

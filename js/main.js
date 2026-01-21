import {
  criarProduto,
  adicionarProduto,
  saidaProduto,
  obterProdutos,
  removerProduto,
  obterHistorico,
  
} from "./storage.js";

import {
  obterDadosFormulario,
  limparFormulario,
  renderizarProdutos,
  onSubmit,
  mostrarMensagem,
  renderizarHistorico
} from "./ui.js";

function atualizarUI() {
  renderizarProdutos(
    obterProdutos(),
    handleRemoverProduto,
    handleSaidaProduto
  );
  renderizarHistorico(obterHistorico());
}

function handleRemoverProduto(id) {
  removerProduto(id);
  atualizarUI();
}

function handleSaidaProduto(id, quantidade) {
  const sucesso = saidaProduto(id, quantidade);

  if (!sucesso) {
    mostrarMensagem("Quantidade inválida para saída.", "erro");
    return;
  }

  atualizarUI();
}

onSubmit(function (event) {
  event.preventDefault();

  const { nome, quantidade, categoria } = obterDadosFormulario();

  if (nome === "" || quantidade <= 0) {
    alert("Preencha o nome e uma quantidade válida.");
    return;
  }

  const novoProduto = criarProduto(nome, quantidade, categoria);
  adicionarProduto(novoProduto);

  atualizarUI();
  limparFormulario();
});

  function limparHistoricoAdmin() {
  localStorage.removeItem("historico_estoque");
  alert("Histórico apagado com sucesso.");
}

function resetarEstoqueAdmin() {
  localStorage.removeItem("produtos_estoque");
  localStorage.removeItem("historico_estoque");
  alert("Estoque resetado.");
  location.reload();
}

document.getElementById("btn-resetar-estoque")
  .addEventListener("click", resetarEstoqueAdmin);


atualizarUI();

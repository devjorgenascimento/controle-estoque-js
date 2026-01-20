import {
  criarProduto,
  adicionarProduto,
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

atualizarUI();

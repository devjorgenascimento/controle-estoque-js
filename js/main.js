

import {
  criarProduto,
  adicionarProduto,
  obterProdutos
} from "./storage.js";

import {
  obterDadosFormulario,
  limparFormulario,
  renderizarProdutos,
  onSubmit
} from "./ui.js";

onSubmit(function (event) {
  event.preventDefault();

  const { nome, quantidade, categoria } = obterDadosFormulario();

  if (nome === "" || quantidade <= 0) {
    alert("Preencha o nome e uma quantidade válida.");
    return;
  }

  const novoProduto = criarProduto(nome, quantidade, categoria);

  adicionarProduto(novoProduto);
  renderizarProdutos(obterProdutos());
  limparFormulario();
});

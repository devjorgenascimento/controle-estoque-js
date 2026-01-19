
const formProduto = document.getElementById("form-produto");

const inputNome = document.getElementById("nome");
const inputQuantidade = document.getElementById("quantidade");
const inputCategoria = document.getElementById("categoria");

const listaProdutos = document.getElementById("lista-produtos");


function obterDadosFormulario() {
  return {
    nome: inputNome.value.trim(),
    quantidade: Number(inputQuantidade.value),
    categoria: inputCategoria.value.trim()
  };
}

function limparFormulario() {
  formProduto.reset();
}

function onSubmit(callback) {
  formProduto.addEventListener("submit", callback);
}


function obterClasseEstoque(quantidade) {
  if (quantidade >= 100) return "estoque-alto";
  if (quantidade >= 50) return "estoque-medio";
  return "estoque-baixo";
}


function renderizarProdutos(produtos, onRemover, onSaida) {
  listaProdutos.innerHTML = "";

  produtos.forEach(produto => {
    const itemLista = document.createElement("li");
    itemLista.classList.add(
      "produto",
      obterClasseEstoque(produto.quantidade)
    );

    const texto = document.createElement("span");
    texto.textContent =
      `${produto.nome} | Quantidade: ${produto.quantidade} | Categoria: ${produto.categoria}`;


    const botaoSaida = document.createElement("button");
    botaoSaida.textContent = "Saída";
    botaoSaida.addEventListener("click", () => {
      const quantidade = Number(
        prompt("Quantidade de saída:")
      );

      if (quantidade > 0) {
        onSaida(produto.id, quantidade);
      }
    });

   
    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.addEventListener("click", () => {
      onRemover(produto.id);
    });

    itemLista.appendChild(texto);
    itemLista.appendChild(botaoSaida);
    itemLista.appendChild(botaoRemover);

    listaProdutos.appendChild(itemLista);
  });
}


export {
  obterDadosFormulario,
  limparFormulario,
  renderizarProdutos,
  onSubmit
};

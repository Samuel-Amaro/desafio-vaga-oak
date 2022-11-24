let form = document.querySelector(".form");

let produtosCadastrados = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  setProduto();
  if(produtosCadastrados.length === 1) {
    renderList();
  }
  populateList();
  clearCampos();
});

function setProduto() {
  let formData = new FormData(form);
  let produto = {
    nomeProduto: "",
    descricaoProduto: "",
    valorProduto: 0,
    disponibilidadeProduto: "",
  };
  for (const [key, value] of formData) {
    produto[key] = value;
  }
  produtosCadastrados.push(produto);
}

function renderList() {
    let tableInner = `
    <h2>Listagem Produtos</h2>
    <table class="list-prod"> 
        <thead>
            <tr>
                <th>Nome</th>
                <th>Valor</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>`;
  form.insertAdjacentHTML("afterend", tableInner); //.after(table);
  populateList();
}

function populateList() {
    let tBody = document.querySelector("tbody");
    tBody.innerHTML = "";
    produtosCadastrados.sort((produtoA, produtoB) => {
      return produtoA.valorProduto - produtoB.valorProduto;
    }).forEach((produto) => {
      let tr = document.createElement("tr");
      let tds = `
      <td>${produto.nomeProduto}</td>
      <td>${produto.valorProduto}</td>
      `;
      tr.innerHTML = tds;
      tBody.appendChild(tr);
    });
}


function clearCampos() {
  document.querySelectorAll(".input__text").forEach((input) => {
    input.value = "";
  });
  document.querySelector(".input__number").value = "";
  document.querySelectorAll(".input__radio").forEach((radio) => {
    radio.checked = false;
  });
  document.querySelectorAll(".input__text")[0].focus();
}
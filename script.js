const capacidadeVan = 11000; // litros
let lista = []; // armazena os itens registrados

function calcular() {
  const mercadoria = document.getElementById("mercadoria").value.trim();
  const registro = document.getElementById("registro").value.trim();
  const volumeCaixa = parseFloat(document.getElementById("volume").value);

  if (!mercadoria && !registro) {
    alert("Preencha pelo menos o nome da mercadoria ou o número de registro.");
    return;
  }

  if (!volumeCaixa || volumeCaixa <= 0) {
    alert("Informe um volume válido para a caixa.");
    return;
  }

  const caixas = Math.floor(capacidadeVan / volumeCaixa);

  // Mostra resultado da mercadoria atual
  document.getElementById("resultado").innerHTML = `
    ${mercadoria ? `<p><strong>Mercadoria:</strong> ${mercadoria}</p>` : ""}
    ${registro ? `<p><strong>Registro:</strong> ${registro}</p>` : ""}
    <p><strong>Volume por caixa:</strong> ${volumeCaixa} L</p>
    <p><strong>Quantidade de caixas que cabem:</strong> 
      <span style="color:green;font-weight:bold">${caixas}</span>
    </p>
  `;

  // Salva mercadoria na lista
  lista.push({
    mercadoria: mercadoria || "-",
    registro: registro || "-",
    volume: volumeCaixa,
    caixas
  });

  atualizarLista();

  // Limpa campos
  //document.getElementById("mercadoria").value = "";
  //document.getElementById("registro").value = "";
  //document.getElementById("volume").value = "";
}

function atualizarLista() {
  const ul = document.getElementById("listaMercadorias");
  ul.innerHTML = "";

  lista.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.mercadoria}</strong> 
      (Registro: ${item.registro}) - 
      Volume: ${item.volume}L → ${item.caixas} caixas
      <button onclick="remover(${index})">❌</button>
    `;
    ul.appendChild(li);
  });
}

function remover(index) {
  lista.splice(index, 1);
  atualizarLista();
}

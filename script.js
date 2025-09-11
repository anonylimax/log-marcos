const capacidadeVan = 11000; // litros (11.000 dm³)
let lista = []; // armazena os itens registrados

function calcular() {
  const mercadoria = document.getElementById("mercadoria").value.trim();
  const registro = document.getElementById("registro").value.trim();

  // Pega valores das medidas
  const comprimento = parseFloat(document.getElementById("comprimento").value);
  const largura = parseFloat(document.getElementById("largura").value);
  const altura = parseFloat(document.getElementById("altura").value);

  // Pega valor do volume digitado
  let volumeCaixa = parseFloat(document.getElementById("volume").value);

  // Se o campo de volume estiver vazio, usa as medidas
  if ((!volumeCaixa || volumeCaixa <= 0) && comprimento > 0 && largura > 0 && altura > 0) {
    volumeCaixa = comprimento * largura * altura; // já em dm³
  }

  if (!mercadoria && !registro) {
    alert("Preencha pelo menos o nome da mercadoria ou o número de registro.");
    return;
  }

  if (!volumeCaixa || volumeCaixa <= 0) {
    alert("Informe um volume válido OU preencha comprimento, largura e altura.");
    return;
  }

  const caixas = Math.floor(capacidadeVan / volumeCaixa);

  // Mostra resultado da mercadoria atual
  document.getElementById("resultado").innerHTML = `
    ${mercadoria ? `<p><strong>Mercadoria:</strong> ${mercadoria}</p>` : ""}
    ${registro ? `<p><strong>Registro:</strong> ${registro}</p>` : ""}
    <p><strong>Volume por caixa:</strong> ${volumeCaixa} dm³</p>
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
}

function atualizarLista() {
  const ul = document.getElementById("listaMercadorias");
  ul.innerHTML = "";

  lista.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.mercadoria}</strong> 
      (Registro: ${item.registro}) - 
      Volume: ${item.volume} dm³ → ${item.caixas} caixas
      <button onclick="remover(${index})">❌</button>
    `;
    ul.appendChild(li);
  });
}

function remover(index) {
  lista.splice(index, 1);
  atualizarLista();
}

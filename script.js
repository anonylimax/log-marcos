function calcular() {
  const nome = document.getElementById("nome").value;
  const registro = document.getElementById("registro").value;
  let volume = parseFloat(document.getElementById("volume").value);

  const comprimento = parseFloat(document.getElementById("comprimento").value);
  const largura = parseFloat(document.getElementById("largura").value);
  const altura = parseFloat(document.getElementById("altura").value);

  const capacidadeVan = 13; // m³ da van

  // Se não informar volume, calcula pelas dimensões em cm
  if (isNaN(volume) && comprimento && largura && altura) {
    volume = (comprimento * largura * altura) / 1000000; // cm³ -> m³
  }

  if (!nome || !registro || isNaN(volume) || volume <= 0) {
    alert("Preencha o nome, nº de registro e informe o volume ou as dimensões.");
    return;
  }

  const quantidadeCaixas = Math.floor(capacidadeVan / volume);
  const ocupado = quantidadeCaixas * volume;
  const sobra = capacidadeVan - ocupado;

  let mensagem = `
    <p><strong>Mercadoria:</strong> ${nome}</p>
    <p><strong>Nº Registro:</strong> ${registro}</p>
    <p><strong>Volume de cada caixa:</strong> ${volume.toFixed(3)} m³</p>
    <p><strong>Quantidade que cabe na van:</strong> ${quantidadeCaixas} caixas</p>
    <p><strong>Espaço ocupado:</strong> ${ocupado.toFixed(2)} m³</p>
    <p><strong>Espaço restante:</strong> ${sobra.toFixed(2)} m³</p>
  `;

  document.getElementById("resultado").innerHTML = mensagem;
  document.getElementById("resultadoCard").style.display = "block";
}

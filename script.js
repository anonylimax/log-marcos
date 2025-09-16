// Capacidade da van em m³
const CAPACIDADE_VAN = 13;

const form = document.getElementById("formCalculo");
const resultadoDiv = document.getElementById("resultado");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const registro = document.getElementById("registro").value.trim();
  let volume = parseFloat(document.getElementById("volume").value);

  const comprimento = parseFloat(document.getElementById("comprimento").value);
  const largura = parseFloat(document.getElementById("largura").value);
  const altura = parseFloat(document.getElementById("altura").value);

  // Se não informar volume, calcular pelas medidas em cm
  if (!volume && comprimento && largura && altura) {
    volume = (comprimento * largura * altura) / 1000000; // cm³ → m³
  }

  if (!volume) {
    resultadoDiv.innerHTML = "⚠️ Informe o volume em m³ ou todas as medidas em cm.";
    return;
  }

  const qtdCaixas = Math.floor(CAPACIDADE_VAN / volume);

  resultadoDiv.innerHTML = `
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Registro:</strong> ${registro}</p>
    <p><strong>Volume da mercadoria:</strong> ${volume.toFixed(3)} m³</p>
    <p><strong>Cabem na van:</strong> ${qtdCaixas} unidades</p>
  `;
});

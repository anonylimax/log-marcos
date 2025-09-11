// Importando Firebase v12 (modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } 
  from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// 🔥 Configuração do Firebase (substitua pelos dados do seu projeto)
const firebaseConfig = {
    apiKey: "AIzaSyDcgx5HqU8nFAQ1Rx7ijKxosFz21QY46os",
    authDomain: "log-marcos.firebaseapp.com",
    projectId: "log-marcos",
    storageBucket: "log-marcos.firebasestorage.app",
    messagingSenderId: "56203738378",
    appId: "1:56203738378:web:de505f5af8e7d89b678ef3",
    measurementId: "G-968XWJD2MD"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🚐 Capacidade da van em dm³
const capacidadeVan = 11000;

// ------------------------------
// 📦 Cadastro de mercadoria
// ------------------------------
document.getElementById("form-mercadoria").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const registro = document.getElementById("registro").value.trim();
  let volume = document.getElementById("volume").value.trim();

  const comprimento = document.getElementById("comprimento").value.trim();
  const largura = document.getElementById("largura").value.trim();
  const altura = document.getElementById("altura").value.trim();

  // Se não tiver volume, calcula pelas medidas
  if (!volume && comprimento && largura && altura) {
    volume = (comprimento * largura * altura).toString();
  }

  if (!volume) {
    alert("Informe o volume ou as medidas.");
    return;
  }

  const volumeNum = parseFloat(volume);
  const qtdCaixas = Math.floor(capacidadeVan / volumeNum);

  document.getElementById("resultado").innerHTML = `
    <p><strong>Nome:</strong> ${nome || "(não informado)"}</p>
    <p><strong>Registro:</strong> ${registro || "(não informado)"}</p>
    <p><strong>Volume:</strong> ${volumeNum} dm³</p>
    <p><strong>Quantidade de caixas que cabem:</strong> ${qtdCaixas}</p>
  `;


  try {
    await addDoc(collection(db, "mercadorias"), {
      nome: nome || null,
      registro: registro || null,
      volume: volumeNum,
      qtdCaixas: qtdCaixas,
      criadoEm: new Date()
    });
    console.log("✅ Mercadoria salva no Firestore!");
  } catch (error) {
    console.error("❌ Erro ao salvar:", error);
  }
});

// ------------------------------
// 🔍 Buscar mercadoria pelo registro
// ------------------------------
document.getElementById("buscarRegistro").addEventListener("click", async () => {
  const registroBusca = document.getElementById("registroBusca").value.trim();

  if (!registroBusca) {
    alert("Digite o número de registro.");
    return;
  }

  try {
    const q = query(
      collection(db, "mercadorias"),
      where("registro", "==", registroBusca)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      document.getElementById("resultadoBusca").innerHTML = `<p>❌ Mercadoria não encontrada.</p>`;
      return;
    }

    snapshot.forEach((doc) => {
      const mercadoria = doc.data();
      const qtdCaixas = Math.floor(capacidadeVan / mercadoria.volume);

      document.getElementById("resultadoBusca").innerHTML = `
        <p><strong>Nome:</strong> ${mercadoria.nome || "(não informado)"}</p>
        <p><strong>Registro:</strong> ${mercadoria.registro}</p>
        <p><strong>Volume:</strong> ${mercadoria.volume} dm³</p>
        <p><strong>Quantidade que cabe na van:</strong> ${qtdCaixas}</p>
      `;
    });
  } catch (error) {
    console.error("❌ Erro ao buscar:", error);
  }
});

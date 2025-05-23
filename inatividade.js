const TEMPO_INATIVIDADE = 5 * 60 * 1000; 
const CHAVE_LOCALSTORAGE = "ultimaAtividade";

function logoutUsuario() {
  alert("Sessão expirada por inatividade.");
  localStorage.removeItem(CHAVE_LOCALSTORAGE);
  window.location.href = "login.html"; 
}

function atualizarUltimaAtividade() {
  localStorage.setItem(CHAVE_LOCALSTORAGE, Date.now());
}

function verificarInatividade() {
  const ultimaAtividade = localStorage.getItem(CHAVE_LOCALSTORAGE);
  if (!ultimaAtividade) {
    atualizarUltimaAtividade();
    return;
  }
  const tempoDecorrido = Date.now() - ultimaAtividade;
  if (tempoDecorrido > TEMPO_INATIVIDADE) {
    logoutUsuario();
  }
}

function iniciarTemporizador() {
  verificarInatividade();
  setInterval(verificarInatividade, 1000); 
}

window.addEventListener("load", () => {
  atualizarUltimaAtividade();
  iniciarTemporizador();

  ["mousemove", "keypress", "click", "scroll", "touchstart"].forEach(evento => {
    document.addEventListener(evento, atualizarUltimaAtividade);
  });
});

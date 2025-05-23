document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cardsContainer");
  const filtro = document.getElementById("filtro");
  const btnLimparTudo = document.getElementById("limparTudo");

  function carregarClientes() {
    return JSON.parse(localStorage.getItem("clientes")) || [];
  }

  function salvarClientes(clientes) {
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }

  function atualizarBotaoLimpar() {
    const clientes = carregarClientes();
    if (clientes.length === 0) {
      btnLimparTudo.style.display = "none";
    } else {
      btnLimparTudo.style.display = "inline-block";
    }
  }

  function excluirCliente(index) {
    const clientes = carregarClientes();
    clientes.splice(index, 1);
    salvarClientes(clientes);
    renderizarClientes(filtro.value);
  }

  function renderizarClientes(filtroNome = "") {
    const clientes = carregarClientes();
    container.innerHTML = "";

    const filtrados = clientes.filter(cliente =>
      cliente.nome.toLowerCase().includes(filtroNome.toLowerCase())
    );

    if (filtrados.length === 0) {
      container.innerHTML = "<p>Nenhum voluntário encontrado.</p>";
      atualizarBotaoLimpar();
      return;
    }

    filtrados.forEach((cliente, index) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const img = document.createElement("img");
      img.src = `https://source.unsplash.com/160x160/?voluntario,${cliente.nome}`;
      img.alt = `Foto de ${cliente.nome}`;

      const nome = document.createElement("h2");
      nome.textContent = cliente.nome;

      const email = document.createElement("p");
      email.innerHTML = `<strong>Email:</strong> ${cliente.email}`;

      const endereco = document.createElement("p");
      endereco.innerHTML = `<strong>Endereço:</strong> ${cliente.endereco}`;

      const btnExcluir = document.createElement("button");
      btnExcluir.textContent = "Excluir";
      btnExcluir.addEventListener("click", () => excluirCliente(clientes.indexOf(cliente)));

      card.appendChild(img);
      card.appendChild(nome);
      card.appendChild(email);
      card.appendChild(endereco);
      card.appendChild(btnExcluir);

      container.appendChild(card);
    });

    atualizarBotaoLimpar();
  }

  filtro.addEventListener("input", () => {
    renderizarClientes(filtro.value);
  });

  btnLimparTudo.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja apagar todos os voluntários?")) {
      localStorage.removeItem("clientes");
      renderizarClientes();
    }
  });

  renderizarClientes();

  
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCliente");
  const tabela = document.getElementById("tabelaClientes");
  const cepInput = document.getElementById("cep");
  const enderecoInput = document.getElementById("endereco");

  cepInput.addEventListener("blur", async () => {
    const cep = cepInput.value.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.erro) {
            
          alert("CEP não encontrado.");
          enderecoInput.value = "";
        } else {
          enderecoInput.value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
        }
      } catch (error) {
        alert("Erro ao buscar o CEP.");
      }
    }
  });

  function salvarCliente(cliente) {
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    clientes.push(cliente);
    localStorage.setItem("clientes", JSON.stringify(clientes));
  }

  function listarClientes() {
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    tabela.innerHTML = "";
    clientes.forEach((c, index) => {
      tabela.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${c.nome}</td>
          <td>${c.email}</td>
          <td>${c.cep}</td>
          <td>${c.endereco}</td>
        </tr>`;
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const cep = cepInput.value.trim();
    const endereco = enderecoInput.value.trim();

    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    const emailExiste = clientes.some(c => c.email.toLowerCase() === email.toLowerCase());

    if (emailExiste) {
      alert("Este e-mail já está cadastrado! Utilize outro.");
      return; 
    }

    if (nome && email && cep && endereco) {
      salvarCliente({ nome, email, cep, endereco });
      form.reset();
      enderecoInput.value = "";
      listarClientes();
    } else {
      alert("Preencha todos os campos corretamente.");
    }
  });

  listarClientes();

  let timeout;

  function logoutUsuario() {
    alert("Sessão expirada por inatividade.");
    window.location.href = "login.html";
  }

  function resetarTemporizador() {
    clearTimeout(timeout);
    timeout = setTimeout(logoutUsuario, 1 * 60 * 1000); 
  }

  window.addEventListener("load", resetarTemporizador);

  const eventos = ["mousemove", "keypress", "click", "scroll", "touchstart"];

  eventos.forEach(evento => {
    document.addEventListener(evento, resetarTemporizador);
  });
});



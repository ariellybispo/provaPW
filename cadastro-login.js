function verificarCadastro(event) {
    event.preventDefault();
  
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar_senha').value;
  
    if (nome.trim() === "") {
      alert("Por favor, preencha o nome completo.");
      return;
    }
  
    if (parseInt(idade) < 18) {
      alert("Você precisa ter 18 anos ou mais para se cadastrar.");
      return;
    }
  
    if (!email.includes("@")) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }
  
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem. Tente novamente.");
      return;
    }
  
    localStorage.setItem("emailCadastrado", email);
    localStorage.setItem("senhaCadastrada", senha);
  
    alert("Cadastro completo!");
    window.location.href = "login.html";
  }
  
  function verificarLogin() {
    const email = document.getElementById('txtEmail').value;
    const senha = document.getElementById('txtSenha').value;
  
    const emailSalvo = localStorage.getItem("emailCadastrado");
    const senhaSalva = localStorage.getItem("senhaCadastrada");
  
    if (email === emailSalvo && senha === senhaSalva) {
      window.location.href = "voluntarios.html";
    } else {
      alert("Email ou senha inválidos.");
    }
  }
  
  document.getElementById('formCadastro')?.addEventListener('submit', verificarCadastro);
  
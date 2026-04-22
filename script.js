// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // 1. MANIPULAÇÃO DO DOM - TEMA ESCURO/CLARO
  // ============================================
  const btnTema = document.querySelector('#btn-tema');

  // Recupera preferência salva no localStorage
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'escuro') {
    document.body.classList.add('dark');
    btnTema.textContent = 'Tema Claro';
  }

  // Toggle do tema
  btnTema.addEventListener('click', function(e) {
    e.preventDefault();
    document.body.classList.toggle('dark');

    const isDark = document.body.classList.contains('dark');

    // Salva preferência no localStorage
    localStorage.setItem('tema', isDark ? 'escuro' : 'claro');

    // Atualiza texto do botão
    btnTema.textContent = isDark ? 'Tema Claro' : 'Tema Escuro';
  });

  // ============================================
  // 2. VALIDAÇÃO DE FORMULÁRIO COM JAVASCRIPT
  // ============================================
  const formulario = document.querySelector('#formulario-contato');
  const inputNome = document.querySelector('#nome');
  const inputEmail = document.querySelector('#email');
  const inputMensagem = document.querySelector('#mensagem');

  // Expressão regular para validação de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    // Limpa mensagens de erro anteriores
    limparErros();

    let valido = true;

    // Validação do nome (mínimo 3 caracteres)
    if (inputNome.value.trim().length < 3) {
      exibirErro(inputNome, 'O nome deve ter pelo menos 3 caracteres.');
      valido = false;
    }

    // Validação do e-mail
    if (!emailRegex.test(inputEmail.value.trim())) {
      exibirErro(inputEmail, 'Digite um e-mail válido.');
      valido = false;
    }

    // Validação da mensagem (máximo 300 caracteres)
    if (inputMensagem.value.length > 300) {
      exibirErro(inputMensagem, 'A mensagem não pode exceder 300 caracteres.');
      valido = false;
    }

    if (valido) {
      // Exibe mensagem de sucesso
      const mensagemSucesso = document.createElement('div');
      mensagemSucesso.textContent = 'Mensagem enviada com sucesso!';
      mensagemSucesso.style.cssText = 'background-color: #4CAF50; color: white; padding: 15px; border-radius: 5px; text-align: center; margin-bottom: 15px;';
      formulario.insertBefore(mensagemSucesso, formulario.firstChild);

      // Limpa o formulário
      formulario.reset();

      // Remove mensagem de sucesso após 3 segundos
      setTimeout(() => {
        mensagemSucesso.remove();
      }, 3000);
    }
  });

  function limparErros() {
    document.querySelectorAll('.erro').forEach(function(el) {
      el.textContent = '';
    });
  }

  function exibirErro(input, mensagem) {
    const campo = input.closest('.campo');
    const spanErro = campo.querySelector('.erro');
    if (spanErro) {
      spanErro.textContent = mensagem;
    }
  }

  // ============================================
  // 3. INTERATIVIDADE NOS CARDS
  // ============================================
  const cards = document.querySelectorAll('.card');

  cards.forEach(function(card) {
    card.addEventListener('click', function() {
      // Remove classe ativo de todos os cards
      cards.forEach(function(c) {
        c.classList.remove('ativo');
      });

      // Adiciona classe ativo apenas ao card clicado
      this.classList.add('ativo');
    });
  });

  // ============================================
  // 4. CONTADOR DE CARACTERES NO TEXTAREA
  // ============================================
  const contadorEl = document.querySelector('.contador');
  const LIMITE_CARACTERES = 300;

  inputMensagem.addEventListener('input', function() {
    const tamanho = this.value.length;
    contadorEl.textContent = `${tamanho} / ${LIMITE_CARACTERES} caracteres`;

    // Muda cor para vermelho ao atingir limite
    if (tamanho >= LIMITE_CARACTERES) {
      contadorEl.classList.add('limite');
    } else {
      contadorEl.classList.remove('limite');
    }
  });

});

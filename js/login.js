$(function () {
  const msgError = $('#msgErrorLogin');
  $('#btnLogin').on('click', function () {
    msgError.text('');
    const usuario = $('#usuarioLogin').val().trim();
    const senha = $('#senhaLogin').val();
    if (!usuario || !senha) {
      msgError.text('Informe usuário e senha.'); return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.usuario === usuario && u.senha === senha);
    if (!user) {
      msgError.text('Usuário ou senha incorretos.'); return;
    }
    alert(`Bem-vindo, ${user.nome}!`);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    window.location.href = '../html/mercado.html';
  });

  $('.toggle-password').on('click', function () {
    const input = $($(this).attr('toggle'));
    const type = input.attr('type') === 'password' ? 'text' : 'password';
    input.attr('type', type);
    $(this).toggleClass('fa-eye fa-eye-slash');
  });
});
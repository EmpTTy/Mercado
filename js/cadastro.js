$(function(){
  const msgErr  = $('#msgErrorCad');
  const msgSucc = $('#msgSuccessCad');

  $('#btnCad').on('click', function(){
    msgErr.text(''); msgSucc.text('');
    const nome  = $('#nome').val().trim();
    const usu   = $('#usuarioCad').val().trim();
    const pass  = $('#senhaCad').val();
    const conf  = $('#confirmSenha').val();
    if (!nome||!usu||!pass||!conf) {
      msgErr.text('Todos os campos são obrigatórios.'); return;
    }
    if (pass.length < 6) {
      msgErr.text('Senha deve ter ao menos 6 caracteres.'); return;
    }
    if (pass !== conf) {
      msgErr.text('As senhas não conferem.'); return;
    }
    const users = JSON.parse(localStorage.getItem('users')||'[]');
    if (users.some(u=>u.usuario===usu)) {
      msgErr.text('Este usuário já existe.'); return;
    }
    users.push({ nome, usuario:usu, senha:pass });
    localStorage.setItem('users', JSON.stringify(users));
    msgSucc.text('Cadastro realizado com sucesso!');
    $('#nome, #usuarioCad, #senhaCad, #confirmSenha').val('');
  });

  $('.toggle-password').on('click', function(){
    const input = $($(this).attr('toggle'));
    const type = input.attr('type') === 'password' ? 'text' : 'password';
    input.attr('type', type);
    $(this).toggleClass('fa-eye fa-eye-slash');
  });
});
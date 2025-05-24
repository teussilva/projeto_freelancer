let btn_sair = document.getElementById('li-sair')
btn_sair.addEventListener('click', function(){
   localStorage.removeItem('registreUser')
   window.location = 'Home.html'
})

window.addEventListener('load', () => {
    let projetoSelecionado = JSON.parse(localStorage.getItem('projetoSelecionado'))

  if (!projetoSelecionado) {
    console.warn("Nenhum projeto selecionado encontrado no localStorage.");
    return;
  }

  const divProjeto = document.querySelector('.projeto');
  if (!divProjeto) {
    console.error("Elemento .projeto não encontrado!");
    return;
  }

  divProjeto.innerHTML = `
    <h3>${projetoSelecionado.titulo}</h3>
    <p><strong>Categoria:</strong> ${projetoSelecionado.categoria}</p>
    <p><strong>Descrição:</strong> ${projetoSelecionado.descricao}</p>
    <p><strong>Valor:</strong> R$ ${projetoSelecionado.orcamento}</p>
    <form>
      <input type="hidden" name="projeto_id" value="${projetoSelecionado.id}">
      <textarea name="mensagem" placeholder="Mensagem para o cliente (opcional)" rows="2"></textarea>
      <button type="submit">Candidatar-se</button>
    </form>
  `;

  let textarea = divProjeto.querySelector('textarea')
  let button_canditatar = divProjeto.querySelector('button')

  button_canditatar.addEventListener('click', function(e) {
    e.preventDefault()
    if(textarea.value !== ''){
        alert('candidatura envianda com sucesso!')
        window.location.href = 'Home.html'
        return textarea.value
    }else{
        alert('Por favor, preencha o campo obrigatório!!!')
        return false
    }
  })
  
});


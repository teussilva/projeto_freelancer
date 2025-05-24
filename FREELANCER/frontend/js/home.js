const carregarProjeto = async function() {
  try {
    let response = await fetch('http://localhost:8080/api/projetos', {
      method: 'GET',
      mode: 'cors'
    });
    
    if (!response.ok) {
      throw new Error('Não foi possível carregar os projetos!');
    }
    const projetos = await response.json();
    return Array.isArray(projetos) ? projetos : [projetos]
  } catch (error) {
    console.error('Erro ao carregar projetos:', error)
    return [];
  }
};

const renderizarProjetos = function(projetos) {
  const sectionPublicacoes = document.querySelector('.publicacoes-lista')
  sectionPublicacoes.innerHTML = '<h2>Projetos Disponíveis</h2>';
  if (projetos.length === 0) {
    sectionPublicacoes.innerHTML += '<p>Nenhum projeto disponível no momento.</p>'
    return;
  }
  
  projetos.forEach(projeto =>{
    let div_publicacao = document.createElement('div')
    let h3 = document.createElement('h3')
    let div_publicacao_descricao = document.createElement('div')
    let p_descricao_publicacao = document.createElement('p')
    let p_descricao_publicacao_habilidades = document.createElement('p')
    let h4_descricao_publicacao_orcamento = document.createElement('h4')
    let div_publicacao_acoes = document.createElement('div')
    let button_candidatar = document.createElement('button')
    
    div_publicacao.setAttribute('class', 'publicacao')
    div_publicacao_descricao.setAttribute('class', 'publicacao-descricao')

    div_publicacao.appendChild(h3)
    div_publicacao.appendChild(div_publicacao_descricao)
    div_publicacao_descricao.appendChild(p_descricao_publicacao)
    div_publicacao_descricao.appendChild(h4_descricao_publicacao_orcamento)
    div_publicacao_descricao.appendChild(p_descricao_publicacao_habilidades)
    div_publicacao.appendChild(div_publicacao_acoes)
    div_publicacao_acoes.appendChild(button_candidatar)

    h3.innerText = projeto.titulo
    p_descricao_publicacao.innerText = projeto.descricao
    h4_descricao_publicacao_orcamento.innerHTML = `<strong>Orçamento:</strong> ${projeto.orcamento}`
    p_descricao_publicacao_habilidades.innerHTML = '<strong>Habilidades requeridas:</strong> ' + projeto.habilidades
    button_candidatar.innerText = 'Candidatar'
    sectionPublicacoes.appendChild(div_publicacao)

    button_candidatar.addEventListener('click', () =>{
       localStorage.setItem('projetoSelecionado', JSON.stringify(projeto));
       window.location.href = 'freelancer.html';
       localStorage.removeItem('registreUser')
       localStorage.removeItem('token')
    })
})
}


window.addEventListener('load', async function() {
  const sectionPublicacoes = document.querySelector('.publicacoes-lista');
  sectionPublicacoes.innerHTML = '<div class="loading">Carregando projetos...</div>';
  
  try {
    const projetos = await carregarProjeto();
    renderizarProjetos(projetos);
  } catch (error) {
    console.error('Erro ao carregar página:', error);
    sectionPublicacoes.innerHTML = `
      <h2>Projetos Disponíveis</h2>
      <p class="error">Erro ao carregar projetos. Tente recarregar a página.</p>
    `;
  }
});
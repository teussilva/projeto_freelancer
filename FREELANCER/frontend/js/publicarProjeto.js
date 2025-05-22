const url = 'http://localhost:8080/api/criar-projeto'
const inserirProjeto = async function(projeto) {
  let message = document.getElementById('message')
  try {
    const token = localStorage.getItem('token')
    let response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: { 
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(projeto)
    })

    const dados = await response.json()
    listaProjeto([dados.projeto])
    message.classList.add('exibir')
  } catch (error) {
    console.error('Erro ao inserir projeto:', error)
  }
}

const validaDadosForm = function() {
  let input_titulo = document.getElementById('titulo')
  let input_categoria = document.getElementById('categoria')
  let input_descricao = document.getElementById('descricao')
  let input_habilidades = document.getElementById('habilidades')
  let input_orcamento = document.getElementById('valor')

  let dadosForm = {
    titulo: input_titulo.value,
    categoria: input_categoria.value,
    descricao: input_descricao.value,
    habilidades: input_habilidades.value,
    orcamento: input_orcamento.value,
  }

  if (dadosForm.titulo.trim() === '' || dadosForm.categoria.trim() === '' || dadosForm.descricao.trim() === '' || dadosForm.habilidades.trim() === '' || dadosForm.orcamento.trim() === '') {
    alert('Por favor, preencha os campos obrigatórios!!!')
    return
  }

  return dadosForm
}

const listaProjeto = function(projetos){
    let section_publicacoes_lista = document.querySelector('.publicacoes-lista')
    // section_publicacoes_lista.innerHTML = ''
    let h2 = document.createElement('h2')
    section_publicacoes_lista.appendChild(h2)

    projetos.forEach(function(projeto){
        h2.innerText = 'Últimas Publicações'
        let div_publicacao = document.createElement('div')
        let h3 = document.createElement('h3')
        let div_publicacao_meta = document.createElement('div')
        let span_publicado = document.createElement('span')
        let span_nome_usuario = document.createElement('span')
        let span_pulicacao_categoria = document.createElement('span')
        let div_publicacao_descricao = document.createElement('div')
        let p_descricao_publicacao = document.createElement('p')
        let p_descricao_publicacao_habilidades = document.createElement('p')
        let div_publicacao_acoes = document.createElement('div')
        let button_salvar_projeto = document.createElement('button')
        let button_deletar_projeto = document.createElement('button')
        let button_editar_projeto = document.createElement('button')

        let userString = localStorage.getItem('usuario')
        let user = JSON.parse(userString)

        div_publicacao.setAttribute('class', 'publicacao')
        div_publicacao_meta.setAttribute('class', 'publicacao-meta')
        div_publicacao_descricao.setAttribute('class', 'publicacao-descricao')
        div_publicacao_acoes.setAttribute('class', 'publicacao-acoes')
        button_salvar_projeto.setAttribute('class', 'btn-outline')
        button_deletar_projeto.setAttribute('class', 'btn-outline')
        button_editar_projeto.setAttribute('class', 'btn-outline')
      
        section_publicacoes_lista.appendChild(div_publicacao)
        div_publicacao.appendChild(h3)
        div_publicacao.appendChild(div_publicacao_meta)
        div_publicacao_meta.appendChild(span_publicado)
        div_publicacao_meta.appendChild(span_nome_usuario)
        div_publicacao_meta.appendChild(span_pulicacao_categoria)
        div_publicacao.appendChild(div_publicacao_descricao)
        div_publicacao_descricao.appendChild(p_descricao_publicacao)
        div_publicacao_descricao.appendChild(p_descricao_publicacao_habilidades)
        div_publicacao.appendChild(div_publicacao_acoes)
        div_publicacao_acoes.appendChild(button_salvar_projeto)
        div_publicacao_acoes.appendChild(button_deletar_projeto)
        div_publicacao_acoes.appendChild(button_editar_projeto)

        
        h3.innerText = projeto.titulo
        span_publicado.innerText = 'Publicado em: ' + projeto.dataPublicacao
        span_nome_usuario.innerText = 'Por: ' + user.nomeCompleto
        span_pulicacao_categoria.innerText = projeto.categoria
        p_descricao_publicacao.innerHTML = projeto.descricao
        p_descricao_publicacao_habilidades.innerHTML = '<strong>Habilidades requeridas:</strong>'+ ' ' + projeto.habilidades
        button_salvar_projeto.innerText = 'Salvar'
        button_deletar_projeto.innerText = 'Deletar Projeto'
        button_editar_projeto.innerText = 'Editar Projeto'
    })
}

const getDadosForm = function() {
  const publicacao_form = document.getElementById('formPublicacao')
  publicacao_form.addEventListener('submit', function(e) {
    e.preventDefault()
    let user = validaDadosForm()
    if (user !== null) inserirProjeto(user)
  })
}

window.addEventListener('DOMContentLoaded', function(){
    let span_nomeUsuarioCompleto = document.getElementById('nome-usuario')
    let user = JSON.parse(localStorage.getItem('usuario'))
    let token = localStorage.getItem('token')
    if(!token){
      window.location.href = 'Home.html'
      alert('Faça login ou se cadastre para acessar a pagina de projetos!')
    }else{
       span_nomeUsuarioCompleto.innerText = user.email
       console.log(user)
    }
})

getDadosForm()
listaProjeto([])


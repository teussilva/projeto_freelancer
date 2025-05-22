const inserirProjeto = async function(projeto) {
  try {
    const token = localStorage.getItem('token')
    let response = await fetch('http://localhost:8080/api/criar-projeto', {
      method: 'POST',
      mode: 'cors',
      headers: { 
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(projeto)
    })

    const dados = await response.json()
    console.log(dados)
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

const listaProjeto = function(projeto){
    let section_publicacoes_lista = document.querySelector('.publicacoes-lista')

    let h2 = document.createElement('h2')
    let div_publicacao = document.createElement('div')
    let h3 = document.createElement('h3')
    let div_publicacao_meta = document.createElement('div')
    let span_publicado = document.createElement('span')
    let span_nome_usuario = document.createElement('span')
    let span_pulicacao_categoria = document.createElement('span')
    let div_publicacao_descricao = document.createElement('div')
    let p_descricao_publicacao = document.createElement('p')
    let p_descricao_publicacao_habilidades = document.createElement('p')

    div_publicacao.setAttribute('class', 'publicacao')
    div_publicacao_meta.setAttribute('class', 'publicacao-meta')
    div_publicacao_descricao.setAttribute('class', 'publicacao-descricao')
   
    section_publicacoes_lista.appendChild(h2)
    section_publicacoes_lista.appendChild(div_publicacao)
    div_publicacao.appendChild(h3)
    div_publicacao.appendChild(div_publicacao_meta)
    div_publicacao_meta.appendChild(span_publicado)
    div_publicacao_meta.appendChild(span_nome_usuario)
    div_publicacao_meta.appendChild(span_pulicacao_categoria)
    div_publicacao.appendChild(div_publicacao_descricao)
    div_publicacao_descricao.appendChild(p_descricao_publicacao)
    div_publicacao_descricao.appendChild(p_descricao_publicacao_habilidades)
    // p_descricao_publicacao_habilidades.appendChild(strong)

    h2.innerText = 'Últimas Publicações'
    h3.innerText = 'Desenvolvedor Front-end React/TypeScript'
    span_publicado.innerText = 'Publicado em: 15/05/2023'
    span_nome_usuario.innerText = 'Por: João Silva'
    span_pulicacao_categoria.innerText = 'Desenvolvimento Web'
    div_publicacao_descricao.innerText = 'Busco freelancer experiente em React com TypeScript para desenvolvimento de aplicação web responsiva. O projeto tem duração estimada de 3 meses e requer disponibilidade para reuniões semanais.'
    p_descricao_publicacao_habilidades.innerText = '<strong>Habilidades requeridas:</strong> React, TypeScript, CSS Modules, Git'

    console.log(section_publicacoes_lista)
}
listaProjeto()
const getDadosForm = function() {
  const publicacao_form = document.getElementById('formPublicacao')
  publicacao_form.addEventListener('submit', function(e) {
    e.preventDefault()
    let user = validaDadosForm()
    if (user !== null) {
      inserirProjeto(user)
    }
  })
}

getDadosForm()
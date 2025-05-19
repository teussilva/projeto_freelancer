const inserirProjeto = async function(projeto) {
  try {
    let response = await fetch('http://localhost:8080/api/criar-projeto', {
      method: 'POST',
      mode: 'cors',
      headers: { 'content-type': 'application/json' },
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

  if (
    dadosForm.titulo === '' ||
    dadosForm.categoria === '' ||
    dadosForm.descricao === '' ||
    dadosForm.habilidades === '' ||
    dadosForm.orcamento === ''
  ) {
    alert('Por favor, preencha os campos obrigatórios!!!')
    return
  }

  return dadosForm
}

const getDadosForm = function() {
  const publicacao_form = document.getElementById('formPublicacao')
  publicacao_form.addEventListener('submit', function(e) {
    e.preventDefault()
    let user = validaDadosForm()
    if (user) {
      inserirProjeto(user)
    }
  })
}

getDadosForm()

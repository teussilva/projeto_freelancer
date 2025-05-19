const registrarUsuario = async function(user){
    let div_message = document.getElementById('message')
    try {
        let response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            mode: 'cors',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
        let data = await response.json()
        localStorage.setItem('user', JSON.stringify(user))
        if(response.ok){
            div_message.classList.add('sucesso')
            window.location = 'login.html'
        } else {
            div_message.classList.add('sucesso')
            div_message.innerText = 'E-mail já cadastrado'
            // alert(`Erro ao registrar: ${data.error || 'Erro desconhecido'}`)
        }
    } catch (error) {
        console.error('Erro ao conectar com o servidor:', error)
        alert('Erro de conexão com o servidor.')
    }
}

const validaDadosForm = function() {
    const input_nomeCompleto = document.getElementById('nome-completo')
    const input_email = document.getElementById('email')
    const input_senha = document.getElementById('senha')

    let dadosForm = {
        nomeCompleto: input_nomeCompleto.value,
        email: input_email.value,
        senha: input_senha.value
    }

    if (dadosForm.nome === '' || dadosForm.email === '' || dadosForm.senha === '') {
        alert('Por favor, preencha os campos obrigatórios!!!')
        return
    }

    return dadosForm
}

const getDadosForm = function() {
    let registre_form = document.getElementById('registreform')
    registre_form.addEventListener('submit', function(e) {
        e.preventDefault()
        let user = validaDadosForm()
        if(user)
            registrarUsuario(user)
        
    })
}

getDadosForm()

window.addEventListener('load', function(){
    this.localStorage.removeItem('loginUser')
})

const setPrimeiroNomeUsuario = function(){
    let span_primeiro_nome = document.getElementById('primeiro-nome')
    let getPrimeiroNomeUsuario = localStorage.getItem('user')
    span_primeiro_nome.innerText = getPrimeiroNomeUsuario.split(' ')[1]
    // console.log(getPrimeiroNomeUsuario.split(' ')[1])
}
const logarUsuario = async function(user){
    let div_message = document.getElementById('message')
    try {
        let response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            mode: 'cors',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
        let data = await response.json()
        localStorage.setItem('loginUser', JSON.stringify(user))
        if(response.ok){
            div_message.classList.remove('error')
            window.location = 'publicarProjeto.html'
        } else {
            div_message.classList.add('error')
            // alert(`Erro ao registrar: ${data.error || 'Erro desconhecido'}`)
        }
    } catch (error) {
        console.error('Erro ao conectar com o servidor:', error)
        alert('Erro de conexão com o servidor.')
    }
}
const validaDadosForm = function() {
    const input_email = document.getElementById('email')
    const input_senha = document.getElementById('senha')

    let dadosForm = {
        email: input_email.value,
        senha: input_senha.value
    }

    if ( dadosForm.email === '' || dadosForm.senha === '') {
        alert('Por favor, preencha os campos obrigatórios!!!')
        return
    }

    return dadosForm
}
const getDadosForm = function(){
    const login_form = document.getElementById('loginForm')
    login_form.addEventListener('submit', function(e){
        e.preventDefault()
         let user = validaDadosForm()
         if(user){
            return logarUsuario(user)
         }else{
             return false
         }
    })
}
getDadosForm()
setPrimeiroNomeUsuario()
const loginUsuario = async function(user) {
    let div_message = document.getElementById('message')
    try {
        let response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            mode: 'cors',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })

        if(response.status !== 200){
            div_message.classList.add('error')
            div_message.innerText = 'Email ou Senha inválidos (s)'
            localStorage.removeItem('token')
            localStorage.removeItem('usuario')
            return
        }

        if(response.status === 200){
            const dados = await response.json()

            // Verifica tipo de usuário
            if (dados.tipoUsuario === 'freelancer') {
                div_message.classList.add('error')
                div_message.innerText = 'Acesso permitido apenas para clientes.'
                div_message.classList.ad('error')
                localStorage.removeItem('token')
                localStorage.removeItem('registreUser')
                window.location.href = 'Home.html'
                return
            }
            localStorage.setItem('token')
            localStorage.setItem('registreUser', JSON.stringify(dados.usuario))
            window.location.href = 'publicarProjeto.html'
        }

    } catch (error) {
        localStorage.removeItem('token')
        console.error(error + ' Email ou senha inválidos ')
    }
}


const validaDadosForm = function(){
    const input_email = document.getElementById('email')
    const input_senha = document.getElementById('senha')

    let dadosForm = {
        email: input_email.value,
        senha: input_senha.value
    }

    if (dadosForm.email === ''  || dadosForm.senha === '') {
        alert('Por favor, preencha os campos obrigatórios!!!')
        return
    }

    return dadosForm
}
const getDadosForm = function(){
     let loginForm = document.getElementById('loginForm')
    loginForm.addEventListener('submit', function(e){
        e.preventDefault()
        let user = validaDadosForm()
        if(user)
            return loginUsuario(user)
        else
           return false
    })
}
getDadosForm()

window.addEventListener('DOMContentLoaded', function(){
    let userLogin = localStorage.getItem('usuario')
    let token = localStorage.getItem('token')
    let registreUser = localStorage.getItem('registreUser')
    if(userLogin && token && registreUser){
        localStorage.removeItem('token')        
        localStorage.removeItem('usuario')
    }
    let span_primero_nome = document.getElementById('primeiro-nome')
    let user = JSON.parse(localStorage.getItem('registreUser'))
    let nomeCompleto = user.nomeCompleto
    span_primero_nome.innerText = nomeCompleto.split(' ')[0]
})

window.addEventListener('load', function(){
    localStorage.removeItem('token')        
    localStorage.removeItem('usuario')
    let span_primero_nome = document.getElementById('primeiro-nome')
    let user = JSON.parse(localStorage.getItem('registreUser'))
    if(user && span_primero_nome){
        let nomeCompleto = user.nomeCompleto
        span_primero_nome.innerText = nomeCompleto.split(' ')[0]
    }else{
        let h1 = document.querySelector('.login-header > h1')
        h1.innerText = 'Seja Bem-vindo de volta!'
    }
})

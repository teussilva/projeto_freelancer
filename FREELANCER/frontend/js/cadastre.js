const registrarUsuario = async function(user) {
     let div_message = document.getElementById('message')
    try {
         let response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            mode: 'cors',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
        if(response.status !== 201){
            div_message.classList.add('sucesso')
            div_message.innerText = ' E-mail já cadastrado.'
            return
        }
        if(response.status === 201){
            const dados = await response.json()
            div_message.classList.add('sucesso')
            window.location = 'login.html'
            localStorage.setItem('registreUser', JSON.stringify(dados))
            const usuarioSalvo = JSON.parse(localStorage.getItem('registreUser'))
            return {dados, usuarioSalvo}
        }
        
    } catch (error) {
        console.error(error)
    }
}

const validaDadosForm = function(){
    const input_nomeCompleto = document.getElementById('nome-completo')
    const input_email = document.getElementById('email')
    const input_tipoUsuario = document.getElementById('tipoUsuario')
    const input_senha = document.getElementById('senha')

    let dadosForm = {
        nomeCompleto: input_nomeCompleto.value,
        email: input_email.value,
        tipoUsuario: input_tipoUsuario.value,
        senha: input_senha.value
    }

    if ( dadosForm.nomeCompleto === '' || dadosForm.email === '' || dadosForm.tipoUsuario === '' || dadosForm.senha === '') {
        alert('Por favor, preencha os campos obrigatórios!!!')
        return
    }

    return dadosForm
}
const getDadosForm = function(){
    let registreForm = document.getElementById('registreform')
    registreForm.addEventListener('submit', function(e){
        e.preventDefault()
        let user = validaDadosForm()
        if(user)
            return registrarUsuario(user)
        else
           return false
    })
}
getDadosForm()

window.addEventListener('DOMContentLoaded', function(){
    let token = localStorage.getItem('token')
    if(token) return localStorage.removeItem('token')
})  
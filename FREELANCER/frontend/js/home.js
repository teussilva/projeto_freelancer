window.addEventListener('DOMContentLoaded', function(){
    let registreUser = localStorage.removeItem('registreUser')
    if(registreUser) 
        return localStorage.removeItem(registreUser)
})
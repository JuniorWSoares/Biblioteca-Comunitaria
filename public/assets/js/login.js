import {isLoginRegisterView, loginForm, registerForm, showLoginLink, showRegisterLink} from "./elements.js"

// LOGIN/CADASTRO (login.ejs)

if (isLoginRegisterView) {
    
    // Lógica de Troca de Formulário
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault() 
            if (loginForm) loginForm.style.display = 'none'
            if (registerForm) registerForm.style.display = 'flex'
        })
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault() 
            if (loginForm) loginForm.style.display = 'flex'
            if (registerForm) registerForm.style.display = 'none'
        })
    }
}
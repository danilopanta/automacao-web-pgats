import { generateUser } from '../../cypress/support/helper';

class Login {
    // === MÉTODOS FUNCIONAIS - AÇÕES DE USUÁRIO ===
    
    // Login de usuário existente
    fazerLogin(email, senha) {
        cy.get('[data-qa="login-email"]').clear().type(email)
        cy.get('[data-qa="login-password"]').clear().type(senha)
        cy.get('[data-qa="login-button"]').click()
        return this
    }

    // Cadastro de novo usuário - passo inicial
    preencherFormularioDeNovoUsuario(nome = null, email = null) {
        const dadosUsuario = generateUser()
        const nomeUsuario = nome || dadosUsuario.name
        const emailUsuario = email || dadosUsuario.email

        cy.get('[data-qa="signup-name"]').clear().type(nomeUsuario)
        cy.get('[data-qa="signup-email"]').clear().type(emailUsuario)
        cy.get('[data-qa="signup-button"]').click()
        return this
    }

    // === MÉTODOS DE VALIDAÇÃO ===
    
    verificarPaginaDeLogin() {
        cy.get('.login-form h2').should('contain', 'Login to your account')
        cy.get('.signup-form h2').should('contain', 'New User Signup!')
        return this
    }

    verificarErroLogin(mensagemErro) {
        cy.get('.login-form form p').should('be.visible')
        cy.get('.login-form form p').should('contain', mensagemErro)
        return this
    }

    verificarErroSignup(mensagemErro) {
        cy.get('.signup-form form p').should('be.visible')
        cy.get('.signup-form form p').should('contain', mensagemErro)
        return this
    }

    verificarQueLoginFoiRealizado() {
        cy.url().should('eq', 'https://automationexercise.com/')
        return this
    }
}

export default new Login()
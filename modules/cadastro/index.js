import { generateUser } from '../../cypress/support/helper'

class Cadastro {
    // === MÉTODOS FUNCIONAIS - AÇÕES DE USUÁRIO ===

    // Preenchimento de informações da conta
    preencherInfoConta(senha, titulo = 'Mr') {
        // Selecionar título
        if (titulo === 'Mr') {
            cy.get('input[value="Mr"]').check()
        } else {
            cy.get('input[value="Mrs"]').check()
        }

        // Senha
        cy.get('[data-qa="password"]').type(senha, { log: false })

        return this
    }

    selecionarDataNascimento(dia = '15', mes = 'March', ano = '1990') {
        cy.get('[data-qa="days"]').select(dia)
        cy.get('[data-qa="months"]').select(mes)
        cy.get('[data-qa="years"]').select(ano)
        return this
    }

    marcarOpcoesDeComunicacao() {
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()
        return this
    }

    preencherInfoEndereco(dadosUsuario) {
        const dados = dadosUsuario || generateUser()

        cy.get('[data-qa="first_name"]').type(dados.firstName)
        cy.get('[data-qa="last_name"]').type(dados.lastName)
        cy.get('[data-qa="company"]').type(dados.company)
        cy.get('[data-qa="address"]').type(dados.address)

        if (dados.address2) {
            cy.get('[data-qa="address2"]').type(dados.address2)
        }

        cy.get('[data-qa="country"]').select(dados.country)
        cy.get('[data-qa="state"]').type(dados.state)
        cy.get('[data-qa="city"]').type(dados.city)
        cy.get('[data-qa="zipcode"]').type(dados.zipcode)
        cy.get('[data-qa="mobile_number"]').type(9999999999)

        return this
    }

    // Método principal - preenche tudo automaticamente
    preencherCadastroCompleto(dadosUsuario = null) {
        const dados = dadosUsuario || generateUser()

        this.preencherInfoConta(dados.password, dados.title)
        this.selecionarDataNascimento(dados.birthDay, dados.birthMonth, dados.birthYear)
        this.marcarOpcoesDeComunicacao()
        this.preencherInfoEndereco(dados)

        return this
    }

    submeterCadastro() {
        cy.get('[data-qa="create-account"]').click()
        return this
    }

    continuarAposCriarConta() {
        cy.get('[data-qa="continue-button"]').click()
        return this
    }

    // === MÉTODOS DE VALIDAÇÃO ===

    verificarContaCriada() {
        cy.get('h2[data-qa="account-created"]').should('be.visible')
        cy.get('h2[data-qa="account-created"]').should('contain', 'Account Created!')
        return this
    }

    verificarQueContaFoiDeletada() {
        cy.get('h2[data-qa="account-deleted"]').should('be.visible')
        cy.get('h2[data-qa="account-deleted"]').should('contain', 'Account Deleted!')
        return this
    }

    verificarPaginaCadastro() {
        cy.url().should('include', '/signup')
        cy.get('h2').should('contain', 'Enter Account Information')
        return this
    }
}

export default new Cadastro()
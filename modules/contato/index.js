import { generateContact } from '../../cypress/support/helper'

class Contato {
    // === MÉTODOS FUNCIONAIS - AÇÕES DE USUÁRIO ===

    // Preenchimento completo do formulário de contato
    preencherFormularioCompleto(dadosContato = null, nomeArquivo = null) {
        const contato = dadosContato || generateContact()

        cy.get('[data-qa="name"]').clear().type(contato.name)
        cy.get('[data-qa="email"]').clear().type(contato.email)
        cy.get('[data-qa="subject"]').clear().type(contato.subject)
        cy.get('[data-qa="message"]').clear().type(contato.message)

        if (nomeArquivo) {
            cy.get('input[type="file"]').selectFile(`cypress/fixtures/${nomeArquivo}`)
        }

        return this
    }

    enviarFormulario() {
        cy.get('[data-qa="submit-button"]').click()

        // Aceitar o alert que aparece ao enviar
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('windowAlert')
        })

        return this
    }

    voltarParaHome() {
        cy.get('.btn.btn-success').click()
        return this
    }

    // === MÉTODOS DE VALIDAÇÃO ===

    verificarPaginaContato() {
        cy.get('h2:contains("Get In Touch")').should('be.visible')
        cy.url().should('include', '/contact_us')
        return this
    }

    verificarMensagemSucesso() {
        cy.get('.status').should('be.visible')
        cy.get('.status').should('contain', 'Success! Your details have been submitted successfully.')
        return this
    }

    verificarQueFormularioFoiLimpo() {
        cy.get('[data-qa="name"]').should('have.value', '')
        cy.get('[data-qa="email"]').should('have.value', '')
        cy.get('[data-qa="subject"]').should('have.value', '')
        cy.get('[data-qa="message"]').should('have.value', '')
        return this
    }
}

export default new Contato()
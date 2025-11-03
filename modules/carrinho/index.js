import { generatePaymentData } from '../../cypress/support/helper'

class Carrinho {
    // === MÉTODOS FUNCIONAIS ===

    // Navegação e gerenciamento básico

    irParaCheckout() {
        cy.get('.btn.btn-default.check_out').click()
        return this
    }

    // Ações do processo de checkout
    adicionarComentario(comentario = 'Entrega rápida por favor') {
        cy.get('textarea[name="message"]').clear().type(comentario)
        return this
    }

    finalizarPedido() {
        cy.get('a[href="/payment"]').click()
        return this
    }

    // Pagamento com cartão
    pagarComCartao(dadosCartao = null) {
        const cartao = dadosCartao || generatePaymentData()

        cy.get('[data-qa="name-on-card"]').clear().type(cartao.cardName)
        cy.get('[data-qa="card-number"]').clear().type(cartao.cardNumber)
        cy.get('[data-qa="cvc"]').clear().type(cartao.cvc)
        cy.get('[data-qa="expiry-month"]').clear().type(cartao.expiryMonth.toString())
        cy.get('[data-qa="expiry-year"]').clear().type(cartao.expiryYear.toString())
        cy.get('[data-qa="pay-button"]').click()

        return this
    }

    // Ações pós-compra
    continuarAposPagamento() {
        cy.get('[data-qa="continue-button"]').click()
        return this
    }

    baixarFatura() {
        cy.get('.col-sm-9 > .btn-default').click()
        return this
    }

    // === MÉTODOS DE VALIDAÇÃO ===

    verificarPaginaCarrinho() {
        cy.url().should('include', '/view_cart')
        cy.get('.breadcrumbs').contains('Shopping Cart').should('be.visible')
        return this
    }

    verificarPaginaCheckout() {
        cy.url().should('include', '/checkout')
        cy.get('#address_delivery').should('be.visible')
        cy.get('#address_invoice').should('be.visible')
        return this
    }

    verificarEnderecosCheckout(dadosUsuario) {
        cy.get('#address_delivery').should('contain', dadosUsuario.firstName)
        cy.get('#address_delivery').should('contain', dadosUsuario.address)
        cy.get('#address_invoice').should('contain', dadosUsuario.firstName)
        cy.get('#address_invoice').should('contain', dadosUsuario.address)
        return this
    }

    verificarPaginaPagamento() {
        cy.url().should('include', '/payment')
        cy.get('[data-qa="name-on-card"]').should('be.visible')
        cy.get('[data-qa="card-number"]').should('be.visible')
        return this
    }

    verificarPedidoConfirmado() {
        cy.get('h2[data-qa="order-placed"]').should('be.visible')
        cy.get('h2[data-qa="order-placed"]').should('contain', 'Order Placed!')
        return this
    }

    verificarMensagemSucesso() {
        cy.get('.col-sm-9 > p').should('be.visible')
        cy.get('.col-sm-9 > p').should('contain', 'Congratulations! Your order has been confirmed!')
        return this
    }
}

export default new Carrinho()
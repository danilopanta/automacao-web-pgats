import { generateProductSearch } from '../../cypress/support/helper'

class Produtos {
    // === MÉTODOS FUNCIONAIS - AÇÕES DE USUÁRIO ===

    buscarProduto(nomeProduto = null) {
        const termoBusca = nomeProduto || generateProductSearch().searchTerm
        cy.get('#search_product').clear().type(termoBusca)
        cy.get('#submit_search').click()
        return this
    }

    // Visualização de detalhes
    visualizarPrimeiroProduto() {
        cy.get('.features_items .col-sm-4').first().find('a[href*="product_details"]').click()
        return this
    }

    // Adicionar produtos ao carrinho
    adicionarPrimeiroProdutoAoCarrinho() {
        const primeiroProduto = cy.get('.features_items .col-sm-4').first()
        primeiroProduto.trigger('mouseover')
        primeiroProduto.find('a.add-to-cart').first().click()
        return this
    }

    // Ações após adicionar ao carrinho
    continuarComprando() {
        cy.get('.btn.btn-success').contains('Continue Shopping').click()
        return this
    }

    // === MÉTODOS DE VALIDAÇÃO ===

    verificarPaginaProdutos() {
        cy.url().should('include', '/products')
        cy.get('.title.text-center').contains('All Products').should('be.visible')
        return this
    }

    verificarListaProdutos() {
        cy.get('.single-products').should('have.length.greaterThan', 0)
        return this
    }

    verificarResultadoBusca(termoBusca) {
        cy.get('.title.text-center').contains('Searched Products').should('be.visible')
        cy.get('.single-products').should('have.length.greaterThan', 0)
        cy.get('.single-products').first().should('contain', termoBusca)
        return this
    }

    verificarPaginaDetalhes() {
        cy.url().should('include', '/product_details/')
        cy.get('.product-information h2').should('be.visible')
        cy.get('.product-information p:contains("Category")').should('be.visible')
        cy.get('.product-information span span').should('be.visible')
        cy.get('.product-information p:contains("Availability")').should('be.visible')
        cy.get('.product-information p:contains("Condition")').should('be.visible')
        cy.get('.product-information p:contains("Brand")').should('be.visible')
        return this
    }

    verificarInformacoesProduto() {
        cy.get('.product-information h2').should('not.be.empty')
        cy.get('.product-information span span').should('not.be.empty')
        return this
    }
}

export default new Produtos()
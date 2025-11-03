import { generateSubscriptionEmail } from '../../cypress/support/helper'

class Home {
    // === MÉTODOS FUNCIONAIS - AÇÕES DE USUÁRIO ===

    // Navegação básica
    acessarPaginaInicial() {
        cy.visit('/')
        return this
    }

    clicarEmProdutos() {
        cy.get('a[href="/products"]').click()
        return this
    }

    clicarNoLinkDeLogin() {
        cy.get('a[href="/login"]').click()
        return this
    }

    clicarEmContato() {
        cy.get('a[href="/contact_us"]').click()
        return this
    }

    clicarEmCarrinho() {
        cy.get('a[href="/view_cart"]').click()
        return this
    }

    // Ações de navegação na página
    rolarParaOTopo() {
        cy.scrollTo('top')
        return this
    }

    rolarParaOFinal() {
        cy.scrollTo('bottom')
        return this
    }

    // Ações de subscription/newsletter
    fazerSubscription(email = null) {
        const emailParaUsar = email || generateSubscriptionEmail()
        cy.scrollTo('bottom')
        cy.get('#susbscribe_email').clear().type(emailParaUsar)
        cy.get('#subscribe').click()
        return this
    }

    // Ações com categorias de produtos
    expandirCategoriaFeminina() {
        cy.get('a[href="#Women"]').click()
        return this
    }

    expandirCategoriaMasculina() {
        cy.get('a[href="#Men"]').click()
        return this
    }

    expandirCategoriaInfantil() {
        cy.get('a[href="#Kids"]').click()
        return this
    }

    selecionarSubcategoria(nomeSubcategoria) {
        cy.get(`a:contains("${nomeSubcategoria}")`).click()
        return this
    }

    // Ações com produtos recomendados
    adicionarProdutoRecomendadoAoCarrinho(posicao = 0) {
        cy.get('.recommended_items .product-image-wrapper').eq(posicao).find('.add-to-cart').click()
        return this
    }

    visualizarDetalhesDoProdutoRecomendado(posicao = 0) {
        cy.get('.recommended_items .product-image-wrapper').eq(posicao).find('a').contains('View Product').click()
        return this
    }

    // === MÉTODOS DE VALIDAÇÃO ===

    verificarPaginaHome() {
        cy.url().should('eq', 'https://automationexercise.com/')
        cy.get('img[alt="Website for automation practice"]').should('be.visible')
        return this
    }

    verificarQueElementosPrincipaisEstaoVisiveis() {
        cy.get('#slider-carousel').should('be.visible')
        cy.get('.left-sidebar').should('be.visible')
        return this
    }

    verificarSecaoSubscription() {
        cy.get('h2').contains('Subscription').should('be.visible')
        cy.get('#susbscribe_email').should('be.visible')
        cy.get('#subscribe').should('be.visible')
        return this
    }

    verificarSubscriptionSucesso() {
        cy.get('.alert-success').should('be.visible')
        cy.get('.alert-success').should('contain', 'You have been successfully subscribed!')
        return this
    }

    verificarQueProdutosRecomendadosEstaoVisiveis() {
        cy.get('.recommended_items').should('be.visible')
        cy.get('h2').contains('recommended items').should('be.visible')
        cy.get('.recommended_items .product-image-wrapper').should('have.length.greaterThan', 0)
        return this
    }

    verificarQueCategoriasEstaoVisiveis() {
        cy.get('h2').contains('Category').should('be.visible')
        cy.get('a[href="#Women"]').should('be.visible')
        cy.get('a[href="#Men"]').should('be.visible')
        cy.get('a[href="#Kids"]').should('be.visible')
        return this
    }

    verificarQueSubcategoriaEstaVisivel(nomeSubcategoria) {
        cy.get(`a:contains("${nomeSubcategoria}")`).should('be.visible')
        return this
    }
}

export default new Home()
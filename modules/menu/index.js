class Menu {
    // === MÉTODOS FUNCIONAIS - AÇÕES DE USUÁRIO ===

    // Navegação principal
    navegarParaLogin() {
        cy.get('a[href="/login"]').click()
        return this
    }

    navegarParaProdutos() {
        cy.get('a[href="/products"]').click()
        return this
    }

    navegarParaContato() {
        cy.get('a[href="/contact_us"]').click()
        return this
    }

    navegarParaCarrinho() {
        cy.get('a[href="/view_cart"]').first().click()
        return this
    }

    // Ações de usuário logado
    fazerLogout() {
        cy.get('a[href="/logout"]').click()
        return this
    }

    deletarMinhaConta() {
        cy.get('a[href="/delete_account"]').click()
        return this
    }

    // === MÉTODOS DE VALIDAÇÃO ===

    verificarQueUsuarioEstaLogado(nomeUsuario) {
        cy.get('a:contains("Logged in as")').should('be.visible')
        cy.get('a:contains("Logged in as")').should('contain', nomeUsuario)
        return this
    }

}

export default new Menu()
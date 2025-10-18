class Menu{
    navegarParaLogin() {
        cy.get('a[href="/login"]').click()
    }
    efetuarLogout(){
        cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    }
}

export default new Menu()
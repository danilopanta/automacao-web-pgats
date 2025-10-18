describe('Drag and drop and windows', () => {
    beforeEach(() => {
        cy.visit('https://the-internet.herokuapp.com/windows')
    })
    it('Multiple windows', () => {
        cy.contains('Click Here')
            .invoke('removeAttr', 'target').click()
        cy.get('h3').should('have.text', 'New Window')

        cy.go('back')
        cy.get('h3').should('have.text', 'Opening a new window')
    })
    it('Drag and drop', () => {
        cy.visit('https://the-internet.herokuapp.com/drag_and_drop')
        const dataTransfer = new DataTransfer()

        cy.contains('A').trigger('dragstart', { dataTransfer })
        cy.contains('B').trigger('drop', { dataTransfer })
    })
})
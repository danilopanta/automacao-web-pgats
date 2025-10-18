import { faker } from '@faker-js/faker'
class Cadastro{
    preencherFormularioDePreCadastro(){
       // cy.contains('button', 'Signup').click()
        
        cy.get('input[type=radio]').check("Mrs")
        cy.get('[data-qa="password"]').type('123456', {log: false})
        
        //Comboboxes
        cy.get('[data-qa="days"]').select('1')
        cy.get('[data-qa="months"]').select('January')    
        cy.get('[data-qa="years"]').select('1990')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('[data-qa="first_name"]').type(faker.person.firstName())
        cy.get('[data-qa="last_name"]').type(faker.person.lastName())
        cy.get('[data-qa="company"]').type(faker.company.name())
        cy.get('[data-qa="address"]').type(faker.location.streetAddress())
  
        cy.get('[data-qa="country"]').select('Canada')
        cy.get('[data-qa="state"]').type(faker.location.state())
        cy.get('[data-qa="city"]').type(faker.location.city())
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type('9999999999')
        
        //Act
        cy.get('[data-qa="create-account"]').click()
    }

}

export default new Cadastro()
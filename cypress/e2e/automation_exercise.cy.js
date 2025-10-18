/// <reference types="cypress" />
/**
 * 
 * 
 * HOOKS / Ganchos
 * before() - 1 vez antes de todos os testes (it)
* beforeEach() - antes de cada teste (it)
 * after() - 1 vez depois de todos os testes (it)
 * afterEach() - depois de cada teste (it)
 *  */ 
import { faker } from '@faker-js/faker';

import userData from '../fixtures/example.json'
import { 
    getRandonNumber,
    getRandonEmail
 } from '../support/helper'


userData.name
userData.email
userData.body

describe('Automation Exercise', () => {
    beforeEach(() => {
        // Código a ser executado antes de cada teste
        //cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/')
        cy.get('a[href="/login"]').click()
            
    })
    it.only('Cadastro de usuário', () => { 
        //Arrange - Preparação / Configuração

        const timestamp = new Date().getTime();

        //Acessar o site
        cy.get('input[data-qa="signup-name"]').type(userData.name)
        cy.get('input[data-qa="signup-email"]').type(getRandonEmail())
        cy.get('button[data-qa="signup-button"]').click()

        //Informação da conta
        cy.get('input#id_gender1').check()
        cy.get('input#password').type('Mudar@123')
        cy.get('select#days').select('20')
        cy.get('select#months').select(faker.date.month())
        cy.get('select#years').select('1991')

        //Newsletter e ofertas especiais
        cy.get('input#newsletter').check()
        cy.get('input#optin').check()

        //Informação de Endereço
        cy.get('input#first_name').type(faker.person.firstName())
        cy.get('input#last_name').type(faker.person.lastName())
        cy.get('input#company').type(`PGATS ${faker.company.name()}`)
        cy.get('input#address1').type(faker.location.streetAddress())
        cy.get('select#country').select('Canada')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())
        cy.get('input#zipcode').type(faker.location.zipCode())
        cy.get('input#mobile_number').type('111 222 333')

        //Act - Ação
        //Enviar o formulário
        cy.get('button[data-qa="create-account"]').click()

        //Assert - Verificação / Validação
        cy.url().should('include', '/account_created')
        cy.contains('h2', 'Account Created!').should('have.text', 'Account Created!')
    })

    it('Login de usuário com email e senha corretos', () => { 
                
        cy.get('input[data-qa="login-email"]').type('qa-tester-1759530219181@test.com')
        cy.get('input[data-qa="login-password"]').type('12345')
        cy.get('button[data-qa="login-button"]').click()

        cy.get('i.fa-user').parent().should('contain', 'QA Tester') 
        cy.get('a[href="/logout"]').should('be.visible')
        cy.contains('b', 'QA Tester')

        cy.get(':nth-child(10) > a')
        .should('be.visible')
        .and('have.text', ' Logged in as QA Tester')

        cy.contains('b', 'QA Tester')
        cy.contains('Logged in as QA Tester').should('be.visible')


    });

    it('Login de usuário com email e senha incorretos', () => { 
         
        cy.get('input[data-qa="login-email"]').type('qa-tester-1759530219181@test.com')
        cy.get('input[data-qa="login-password"]').type('senha_incorreta')
        cy.get('button[data-qa="login-button"]').click()

        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
         
    });

      it('Logout de usuário', () => {  

        cy.get('input[data-qa="login-email"]').type('qa-tester-1759530219181@test.com')
        cy.get('input[data-qa="login-password"]').type('12345')
        cy.get('button[data-qa="login-button"]').click()

        cy.get('i.fa-user').parent().should('contain', 'QA Tester') 
        cy.get('a[href="/logout"]').should('be.visible').click()

        cy.url().should('contain', '/login') 
    });

    it('Cadastro de usuário com email já existente', () => { 
         
        cy.get('input[data-qa="signup-name"]').type('Danilo Panta')
        cy.get('input[data-qa="signup-email"]').type(`qa-tester-1759530219181@test.com`)
        cy.get('button[data-qa="signup-button"]').click()
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')     
    });

    it('Enviar um formulário de contato com upload de arquivo', () => { 

        cy.get(`a[href*="/contact"]`).click()   
        cy.get('input[data-qa="name"]').type(userData.name)
        cy.get('input[data-qa="email"]').type(userData.email)
        cy.get('[data-qa="subject"]').type(userData.subject)
        cy.get('textarea[data-qa="message"]').type('Aqui vai uma mensagem de teste')
        cy.fixture('example.json').as('arquivo') 
        cy.get('input[type="file"]').selectFile('@arquivo')

        cy.get('[data-qa="submit-button"]').click()

        //Assert - Verificação / Validação
        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
    });

});

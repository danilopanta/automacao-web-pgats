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
require('cypress-xpath');

import { faker } from '@faker-js/faker';

import userData from '../fixtures/example.json'
import { 
    getRandonNumber,
    getRandonEmail
 } from '../support/helper'

// Dados do arquivo de fixtures
userData.name
userData.email
userData.body

describe('Automation Exercise', () => {
    beforeEach(() => {
        // Código a ser executado antes de cada teste
        //cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/')
        // Usando xpath com sintaxe correta
        cy.xpath('//a[@href="/login"]').click()
            
    })
    it('Cadastro de usuário', () => { 
        //Arrange - Preparação / Configuração

        const timestamp = new Date().getTime();

        //Acessar o site
        cy.xpath('//input[@data-qa="signup-name"]').type(userData.name)
        cy.xpath('//input[@data-qa="signup-email"]').type(getRandonEmail())
        cy.xpath('//button[@data-qa="signup-button"]').click()

        //Informação da conta
        cy.xpath('//input[@id="id_gender1"]').check()
        cy.xpath('//input[@id="password"]').type('Mudar@123')
        cy.xpath('//select[@id="days"]').select('20')
        cy.xpath('//select[@id="months"]').select(faker.date.month())
        cy.xpath('//select[@id="years"]').select('1991')

        //Newsletter e ofertas especiais
        cy.xpath('//input[@id="newsletter"]').check()
        cy.xpath('//input[@id="optin"]').check()

        //Informação de Endereço
        cy.xpath('//input[@id="first_name"]').type(faker.person.firstName())
        cy.xpath('//input[@id="last_name"]').type(faker.person.lastName())
        cy.xpath('//input[@id="company"]').type(`PGATS ${faker.company.name()}`)
        cy.xpath('//input[@id="address1"]').type(faker.location.streetAddress())
        cy.xpath('//select[@id="country"]').select('Canada')
        cy.xpath('//input[@id="state"]').type(faker.location.state())
        cy.xpath('//input[@id="city"]').type(faker.location.city())
        cy.xpath('//input[@id="zipcode"]').type(faker.location.zipCode())
        cy.xpath('//input[@id="mobile_number"]').type('111 222 333')

        //Act - Ação
        //Enviar o formulário
        cy.xpath('//button[@data-qa="create-account"]').click()

        //Assert - Verificação / Validação
        cy.url().should('include', '/account_created')
        cy.contains('h2', 'Account Created!').should('have.text', 'Account Created!')
    })

    it('Login de usuário com email e senha corretos', () => { 
                
        cy.xpath('//input[@data-qa="login-email"]').type('qa-tester-1759530219181@test.com')
        cy.xpath('//input[@data-qa="login-password"]').type('12345')
        cy.xpath('//button[@data-qa="login-button"]').click()

        cy.xpath('//i[@class="fa fa-user"]').parent().should('contain', 'QA Tester') 
        cy.xpath('//a[@href="/logout"]').should('be.visible')
        cy.xpath('//b[contains(text(), "QA Tester")]')

        cy.get(':nth-child(10) > a')
        .should('be.visible')
        .and('have.text', ' Logged in as QA Tester')

        cy.contains('b', 'QA Tester')
        cy.contains('Logged in as QA Tester').should('be.visible')


    });

    it('Login de usuário com email e senha incorretos', () => { 
         
        cy.xpath('//input[@data-qa="login-email"]').type('qa-tester-1759530219181@test.com')
        cy.xpath('//input[@data-qa="login-password"]').type('senha_incorreta')
        cy.xpath('//button[@data-qa="login-button"]').click()

        cy.xpath('//div[@class="login-form"]//form//p').should('contain', 'Your email or password is incorrect!')
         
    });

      it('Logout de usuário', () => {  

        cy.xpath('//input[@data-qa="login-email"]').type('qa-tester-1759530219181@test.com')
        cy.xpath('//input[@data-qa="login-password"]').type('12345')
        cy.xpath('//button[@data-qa="login-button"]').click()

        cy.xpath('//i[@class="fa fa-user"]').parent().should('contain', 'QA Tester') 
        cy.xpath('//a[@href="/logout"]').should('be.visible').click()

        cy.url().should('contain', '/login') 
    });

    it('Cadastro de usuário com email já existente', () => { 
         
        cy.xpath('//input[@data-qa="signup-name"]').type('Danilo Panta')
        cy.xpath('//input[@data-qa="signup-email"]').type(`qa-tester-1759530219181@test.com`)
        cy.xpath('//button[@data-qa="signup-button"]').click()
        cy.xpath('//div[@class="signup-form"]//form//p').should('contain', 'Email Address already exist!')     
    });

    it('Enviar um formulário de contato com upload de arquivo', () => { 

        cy.xpath('//a[contains(@href, "/contact")]').click()   
        cy.xpath('//input[@data-qa="name"]').type(userData.name)
        cy.xpath('//input[@data-qa="email"]').type(userData.email)
        cy.xpath('//input[@data-qa="subject"]').type(userData.subject)
        cy.xpath('//textarea[@data-qa="message"]').type('Aqui vai uma mensagem de teste')
        cy.fixture('example.json').as('arquivo') 
        cy.xpath('//input[@type="file"]').selectFile('@arquivo')

        cy.xpath('//input[@data-qa="submit-button"]').click()

        //Assert - Verificação / Validação
        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
    });

});

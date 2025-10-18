///<reference types="cypress" />

import userData from '../fixtures/example.json'

import menu from '../../modules/menu'
import login from '../../modules/login'
import cadastro from '../../modules/cadastro'

describe('Automation Exercise', () => {

    beforeEach(() => {
        cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/')

        menu.navegarParaLogin()
    })
    // CT 01
    it('Cadastrar um usuário', () => {

        cy.contains('button', 'Signup').click()

        login.preencherFormularioDePreCadastro()
        cadastro.preencherFormularioDePreCadastro()

        //Assert
        cy.url().should('includes', 'account_created')

        cy.contains('b', 'Account Created!')

        cy.get('[data-qa="continue-button"]').click()

    });
    // CT 02
    it('Login de usuário com e-mail e senha corretos', () => {


        cy.get('a[href="/login"]').click()

        login.preencherFormularioDeLogin(userData.email, userData.password)
        cy.get('i.fa-user').parent().should('contain', userData.name)

        cy.get(':nth-child(9) > a')

    });
    // CT 03
    it('Login de usuário com e-mail e senha incorretos', () => {

        cy.get('a[href="/login"]').click()

        login.preencherFormularioDeLogin(userData.email, '120456')
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
    });
    // CT 04
    it('Logout de usuário com e-mail e senha corretos', () => {
        cy.get('a[href="/login"]').click()

        login.preencherFormularioDeLogin(userData.email, userData.password)
        cy.get(':nth-child(9) > a')

        menu.efetuarLogout()
        cy.get('.login-form > h2').should('contain', 'Login to your account')

    })
    // CT 05
    it('Cadastrar usuário com e-mail e senha existente', () => {

        cy.get('a[href="/login"]').click()
        cy.get('[data-qa="signup-name"]').type('Qa Eevee')
        cy.get('[data-qa="signup-email"]').type('eevee-1759530412987@teste.com')
        cy.contains('button', 'Signup').click()
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    })
    // CT 06
    it('Enviar um formulario de contato', () => {

        cy.get(':nth-child(8) > a').click()
        cy.get('[data-qa="name"]').type(userData.name)
        cy.get('[data-qa="email"]').type('eevee-1759530412987@teste.com')
        cy.get('[data-qa="subject"]').type(userData.subject)
        cy.get('[data-qa="message"]').type(userData.message)

        cy.fixture('example.json').as('file')
        cy.get('input[type=file]').selectFile('@file')

        cy.get('[data-qa="submit-button"]').click()
        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')


    })
    // CT 07
    it('Listar todos os produtos e validar a página de detalhes', () => {
        // Acesse a página de produtos
        cy.visit('https://automationexercise.com/products')

        cy.get('.title.text-center').should('contain', 'All Products')

        cy.get('.single-products', { timeout: 10000 }).should('have.length.greaterThan', 0)
        cy.get('.single-products').first().trigger('mouseover')
        cy.get('.choose > .nav > li > a').first().click()

        cy.get('.product-information').should('be.visible')
        cy.get('.product-information h2').should('not.be.empty')
    })
    // CT 08
    it('Pesquisar um produto e validar o resultado', () => {

        cy.visit('https://automationexercise.com/products')

        cy.get('.title.text-center', { timeout: 10000 }).should('contain', 'All Products')

        cy.get('#search_product', { timeout: 10000 }).type('Dress')
        cy.get('#submit_search').click()

        cy.get('.title.text-center').should('contain', 'Searched Products')
        cy.get('.single-products', { timeout: 10000 }).should('have.length.greaterThan', 0)
    })
    // CT 09
    it('Validar a inscrição de e-mail na home', () => {
        cy.get('#susbscribe_email').type('teste' + Date.now() + '@email.com')
        cy.get('#subscribe').click()
        cy.get('.alert-success')
            .should('be.visible')
            .and('contain', 'You have been successfully subscribed!')
    })
})

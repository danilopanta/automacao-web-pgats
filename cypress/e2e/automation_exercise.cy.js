/// <reference types="cypress" />

import userData from '../fixtures/example.json'
import {
    getRandomNumber,
    getRandomEmail

} from '../support/helper'

import { faker } from '@faker-js/faker'

describe('Automation Exercise', () => {

    beforeEach(() => {
        cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/')
        cy.get('a[href="/login"]').click()
    })
    //CT 01
    it('Exemplos de Logs', () => {
        cy.log(`getRandomNumber: ${getRandomNumber()}`)
        cy.log(`getRandomEmail: ${getRandomEmail()}`)

        cy.log(`Dog breed: ${faker.animal.dog()}`)
        cy.log(`Full name: ${faker.person.fullName()}`)
        cy.log(`Company: ${faker.company.name()}`)

        cy.log(`Nome de usuário: ${userData.name}`)
        cy.log(`Email do usuário: ${userData.email}`)

    })
    //CT 02
    it('Cadastrar um usuário', () => {

        cy.contains('button', 'Signup').click()
        cy.get('a[href="/login"]').click()
        cy.get('[data-qa="signup-name"]').type('Qa Eevee')
        cy.get('[data-qa="signup-email"]').type(getRandomEmail())
        cy.contains('button', 'Signup').click()

        cy.get('input[type=radio]').check("Mrs")
        cy.get('[data-qa="password"]').type('123456', { log: false })

        //Combo boxes
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

        //Assert
        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')
        cy.get('[data-qa="continue-button"]').click()

    });
    //CT 03
    it('Login de usuário com e-mail e senha corretos', () => {

        cy.get('a[href="/login"]').click()

        cy.get('[data-qa="login-email"]').type('eevee-1759530412987@teste.com')
        cy.get('[data-qa="login-password"]').type('123456', { log: false })
        cy.get('[data-qa="login-button"]').click()
        cy.contains('b', 'Qa Eevee')
        cy.get(':nth-child(9) > a')

    });
    //CT 04
    it('Login de usuário com e-mail e senha incorretos', () => {

        cy.get('a[href="/login"]').click()

        cy.get('[data-qa="login-email"]').type('eevee-1759530412987@teste.com')
        cy.get('[data-qa="login-password"]').type('120456', { log: false })
        cy.get('[data-qa="login-button"]').click()
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
    });
    //CT 05
    it('Logout de usuário com e-mail e senha corretos', () => {
        //  cy.visit('https://automationexercise.com/')

        cy.get('a[href="/login"]').click()


        cy.get('[data-qa="login-email"]').type('eevee-1759530412987@teste.com')
        cy.get('[data-qa="login-password"]').type('123456', { log: false })
        cy.get('[data-qa="login-button"]').click()
        // cy.contains('b', 'Qa Eevee')
        cy.get(':nth-child(9) > a')
        cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
        cy.get('.login-form > h2').should('contain', 'Login to your account')

    })
    //CT 06
    it('Cadastrar usuário com e-mail e senha existente', () => {
        //  cy.visit('https://automationexercise.com/');        
        cy.get('a[href="/login"]').click()
        cy.get('[data-qa="signup-name"]').type('Qa Eevee')
        cy.get('[data-qa="signup-email"]').type('eevee-1759530412987@teste.com')
        cy.contains('button', 'Signup').click()
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
        //cy.get('b').should('contain', 'Email Address already exist!')   
    })
    //CT 07
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

})

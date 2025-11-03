import { faker } from '@faker-js/faker'

export function getRandomNumber() {
    return faker.number.bigInt()
}

export function getRandomEmail() {
    return faker.internet.email({ firstName: 'qatester', lastName: `${new Date().getTime()}` })
}

export function getTimestamp() {
    return new Date().getTime()
}

// Dados de usuário dinâmicos
export function generateUser() {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName: firstName.toLowerCase(), lastName: lastName.toLowerCase() }),
        password: faker.internet.password({ length: 8 }) + '@123',
        title: faker.helpers.arrayElement(['Mr', 'Mrs']),
        firstName: firstName,
        lastName: lastName,
        company: faker.company.name(),
        address: faker.location.streetAddress(),
        address2: faker.location.secondaryAddress(),
        country: 'Canada', // Fixo para evitar problemas de localização
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        mobile: faker.phone.number()
    }
}

// Dados de contato dinâmicos
export function generateContact() {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        subject: `${faker.lorem.words(3)} - Automation Testing`,
        message: faker.lorem.paragraph(3)
    }
}

// Dados de produto para busca
export function generateProductSearch() {
    return {
        searchTerm: faker.helpers.arrayElement(['Blue', 'Dress', 'Top', 'Jeans', 'Shirt']),
        category: faker.helpers.arrayElement(['Women', 'Men', 'Kids']),
        subcategory: faker.helpers.arrayElement(['Tops', 'Dress', 'Saree'])
    }
}

// Dados de cartão de crédito (fake para teste)
export function generatePaymentData() {
    return {
        cardName: faker.person.fullName(),
        cardNumber: '4242424242424242', // Número de teste do Stripe
        cvc: faker.finance.creditCardCVV(),
        expiryMonth: faker.date.future().getMonth() + 1,
        expiryYear: faker.date.future().getFullYear(),
        comment: faker.lorem.sentence()
    }
}

// Email para subscription
export function generateSubscriptionEmail() {
    return faker.internet.email({ firstName: 'subscriber', lastName: getTimestamp().toString() })
}

// Usuário existente (para testes de login)
export function getExistingUser() {
    return {
        email: 'eevee-1759530412987@teste.com',
        password: '123456',
        name: 'Qa Eevee'
    }
}

// Usuário com dados inválidos
export function getInvalidUser() {
    return {
        email: faker.internet.email(),
        password: 'WrongPassword123'
    }
}
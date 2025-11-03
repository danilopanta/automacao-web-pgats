/// <reference types="cypress" />

import userData from '../fixtures/userData.json'
import {
    generateUser,
    generateProductSearch,
    generatePaymentData,
    getExistingUser,
    getInvalidUser
} from '../support/helper'

// Importar todos os módulos
import menu from '../../modules/menu'
import login from '../../modules/login'
import cadastro from '../../modules/cadastro'
import contato from '../../modules/contato'
import produtos from '../../modules/produtos'
import carrinho from '../../modules/carrinho'
import home from '../../modules/home'

describe('Automation Exercise - PGATS', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
    })

    it('CT01 - Registrar usuário com sucesso', () => {
        const testUser = generateUser()

        menu.navegarParaLogin()
        login.verificarPaginaDeLogin()
        login.preencherFormularioDeNovoUsuario(testUser.name, testUser.email)

        cadastro.verificarPaginaCadastro()
        cadastro.preencherCadastroCompleto(testUser)
        cadastro.submeterCadastro()

        cadastro.verificarContaCriada()
        cadastro.continuarAposCriarConta()
        menu.verificarQueUsuarioEstaLogado(testUser.name)

        // Cleanup
        menu.deletarMinhaConta()
        cadastro.verificarQueContaFoiDeletada()
    })

    it('CT02 - Login de usuário com email e senha correta', () => {
        const existingUser = getExistingUser()

        menu.navegarParaLogin()
        login.verificarPaginaDeLogin()
        login.fazerLogin(existingUser.email, existingUser.password)


        login.verificarQueLoginFoiRealizado()
        menu.verificarQueUsuarioEstaLogado(existingUser.name)
    })

    it('CT03 - Login User with incorrect email and password', () => {
        const invalidUser = getInvalidUser()

        menu.navegarParaLogin()
        login.verificarPaginaDeLogin()
        login.fazerLogin(invalidUser.email, invalidUser.password)

        login.verificarErroLogin('Your email or password is incorrect!')
    })

    it('CT04 - Logout de usuário', () => {
        const existingUser = getExistingUser()

        menu.navegarParaLogin()
        login.fazerLogin(existingUser.email, existingUser.password)
        menu.verificarQueUsuarioEstaLogado(existingUser.name)

        menu.fazerLogout()
        login.verificarPaginaDeLogin()
    })

    it('CT05 - Criar conta com e-mail que já existe', () => {
        const existingUser = getExistingUser()

        menu.navegarParaLogin()
        login.verificarPaginaDeLogin()
        login.preencherFormularioDeNovoUsuario('Test User', existingUser.email)

        login.verificarErroSignup('Email Address already exist!')
    })

    it('CT06 - Preencher formulário de contato', () => {
        menu.navegarParaContato()
        contato.verificarPaginaContato()

        contato.preencherFormularioCompleto(userData.contact, 'userData.json')
        contato.enviarFormulario()

        contato.verificarMensagemSucesso()
        contato.voltarParaHome()
        home.verificarPaginaHome()
    })

    it('CT08 - Validar detalhes da página de produto', () => {
        menu.navegarParaProdutos()
        produtos.verificarPaginaProdutos()
        produtos.verificarListaProdutos()

        produtos.visualizarPrimeiroProduto()
        produtos.verificarPaginaDetalhes()
        produtos.verificarInformacoesProduto()
    })

    it('CT09 - Realizar busca de produto', () => {
        const searchData = generateProductSearch()

        menu.navegarParaProdutos()
        produtos.verificarPaginaProdutos()

        produtos.buscarProduto(searchData.searchTerm)
        produtos.verificarResultadoBusca(searchData.searchTerm)
    })

    it('CT10 - Verificar Subscription no footer', () => {
        home.verificarPaginaHome()
        home.rolarParaOFinal()
        home.verificarSecaoSubscription()

        home.fazerSubscription()
        home.verificarSubscriptionSucesso()
    })

    it('CT15 - Realizar a compra de um produto', () => {
        const testUser = generateUser()
        const paymentData = generatePaymentData()

        // Registrar usuário com dados dinâmicos
        menu.navegarParaLogin()
        login.preencherFormularioDeNovoUsuario(testUser.name, testUser.email)
        cadastro.preencherCadastroCompleto(testUser)
        cadastro.submeterCadastro()

        cadastro.continuarAposCriarConta()

        // Adicionar produto ao carrinho
        menu.navegarParaProdutos()
        produtos.adicionarPrimeiroProdutoAoCarrinho()
        produtos.continuarComprando()

        // Processo de checkout
        menu.navegarParaCarrinho()
        carrinho.verificarPaginaCarrinho()
        carrinho.irParaCheckout()

        carrinho.verificarPaginaCheckout()
        carrinho.verificarEnderecosCheckout(testUser)
        carrinho.adicionarComentario(paymentData.comment)
        carrinho.finalizarPedido()

        // Pagamento com dados dinâmicos
        carrinho.verificarPaginaPagamento()
        carrinho.pagarComCartao(paymentData)

        carrinho.verificarPedidoConfirmado()
        carrinho.verificarMensagemSucesso()
        carrinho.baixarFatura()

        // Cleanup
        carrinho.continuarAposPagamento()
        menu.deletarMinhaConta()
        cadastro.verificarQueContaFoiDeletada()
    })
})
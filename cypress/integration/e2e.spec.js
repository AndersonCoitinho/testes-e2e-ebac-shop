/// <reference types="cypress" />
let dadosLogin
import infoCliente from "../support/page_objects/cliente.page"
const dadosCliente = require('../fixtures/cliente.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
    });

    beforeEach(() => {
        cy.visit('minha-conta/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //Login
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        })
        cy.get('.page-title').should('contain', 'Minha conta')

        //produtos
        cy.get('#primary-menu > .menu-item-629 > a').click()

        cy.addProduto('Abominable Hoodie', 'L', 'Red', 1) //item 1
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProduto('Ajax Full-Zip Sweatshirt', 'M', 'Red', 1) //item 2
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProduto('Ajax Full-Zip Sweatshirt', 'XL', 'Blue', 1) //item 3
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProduto('Abominable Hoodie', 'M', 'Blue', 1) //item 4

        //carrinho
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()


        //dados cliente
        infoCliente.editarCheckoutCliente(
            dadosCliente[2].nome,
            dadosCliente[2].sobrenome,
            dadosCliente[2].empresa,
            dadosCliente[2].pais,
            dadosCliente[2].endereco,
            dadosCliente[2].numero,
            dadosCliente[2].cidade,
            dadosCliente[2].estado,
            dadosCliente[2].cep,
            dadosCliente[2].telefone,
            dadosCliente[2].email
        )

        //pagamento
        cy.get('#payment_method_cod').click()
        cy.get('#terms').check({ force: true })
        cy.get('#place_order').click({ force: true })
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
})

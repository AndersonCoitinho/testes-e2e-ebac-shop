/// <reference types="cypress" />

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('minha-conta/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //Login
        cy.get('#username').type('aluno_ebac@teste.com')
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac')

        //produtos
        cy.get('#primary-menu > .menu-item-629 > a').click()

        //item 1
        var quantidade = 1
        cy.get('[class="product-block grid"]')
        .contains('Abominable Hoodie')
        .click()
        cy.get('.button-variable-item-M').click()
        cy.get('.button-variable-item-Red').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message').should('contain', '“Abominable Hoodie” foi adicionado no seu carrinho.')
        
        //item 2
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('[class="product-block grid"]')
        .contains('Agasalho jhony quest')
        .click()
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message').should('contain', 'Agasalho jhony quest” foi adicionado no seu carrinho.')

        //item 3
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('[class="product-block grid"]')
        .contains('Ajax Full-Zip Sweatshirt')
        .click()
        cy.get('.button-variable-item-S').click()
        cy.get('.button-variable-item-Green').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message').should('contain', '“Ajax Full-Zip Sweatshirt” foi adicionado no seu carrinho.')

        //carrinho
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        cy.get('#terms').click()
        cy.get('#woocommerce_checkout_place_order').click()

        //cy.get('#payment_method_cod').click()
        //cy.get('#terms').click()
        //cy.get('#place_order').click()
        //testar
    });


})

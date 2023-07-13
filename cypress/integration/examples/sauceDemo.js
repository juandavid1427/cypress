/// <reference types="cypress" />

describe('Test in sauce demo page', function() { 

    beforeEach( function() {
        cy.visit('https://www.saucedemo.com/');
    })

    it('Successful Login 1', function() {
       cy.loginSauceDemo('standard_user','secret_sauce'); 
       
       cy.get('.title').invoke('text').should('contain', 'Products');

       cy.get('.title').invoke('text').then((text) => {
        // Use the extracted text as needed
        console.log(text);
        cy.log(text);
        expect(text).to.be.eq('Products');
      });
    })

    it('Successful Login 2', function() {
        cy.loginSauceDemo('standard_user','secret_sauce');
 
        cy.get('.title').then((text) => {
         // Use the extracted text as needed
         let text1 = text.text().trim();
         console.log(text);
         cy.log(text);
         expect(text1).to.be.equal('Products');
         expect(text1).contains('Product');
         cy.contains('prodUcTs', { matchCase: false});
         cy.get('.title').contains('prodUcTs', { matchCase: false});
       });
     })

     it('Locked out User', function() {
        cy.loginSauceDemo('locked_out_user','secret_sauce');
 
        cy.get('.error-message-container').then((text) => {
         // Use the extracted text as needed
         let text1 = text.text().trim();
         console.log(text);
         cy.log(text);
         expect(text1).to.be.equal('Epic sadface: Sorry, this user has been locked out.');
         expect(text1).contains('Sorry, this user');
         cy.contains('has BEEN', { matchCase: false});
         cy.get('.error-message-container').contains('SADface', { matchCase: false});
       });
     })

     it('Login using fixture', function() {
        cy.fixture('usersSauceDemo').then((data) => {
            const usersSauce = data;
            cy.loginSauceDemo(usersSauce.username,usersSauce.password);
        })

        cy.get('.title').invoke('text').should('contain', 'Products');
        cy.get('.title').invoke('text').then((text) => {
        // Use the extracted text as needed
        console.log(text);
        cy.log(text);
        expect(text).to.be.eq('Products');
       });
     })

     it.only('Login using fixture 1', function() {
        cy.fixture('usersSauceDemo').then((data) => {
            const usersSauce = data;
            cy.loginSauceDemo(usersSauce.username,usersSauce.password);
        })

        cy.get('.title').invoke('text').as('productTitle1')

        cy.get('.title').as('productTitle');  // alias, to reuse later if is necessary

        cy.get('@productTitle').invoke('text').should('contain', 'Products')
       
     })

     it.only('Login using fixture 2', function() {
        
        cy.log("invoke:" + this.productTitle1)
       
     })

})




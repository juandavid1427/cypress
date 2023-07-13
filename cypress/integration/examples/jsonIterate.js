/// <reference types="cypress" />

const tests = require('../../fixtures/sauceCredentials.json')

describe('Test in sauce demo page', function() { 

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
    });

   tests.forEach(test => {

      it(test.name, () => {
        
        cy.loginSauceDemo(test.username,test.password); 
        cy.log(test.name)
        debugger; // to do debugger I need to do inspect in the cypress test runner
       if(test.name === 'Standard User'){
        
        cy.get('.title').invoke('text').should('contain', test.expected);

        cy.get('.title').invoke('text').then((text) => {
                // Use the extracted text as needed
                console.log(text);
                cy.log(text);
                expect(text).to.be.eq(test.expected);
            })

        } else {
            cy.get('.error-message-container').then((text) => {
                // Use the extracted text as needed
                let text1 = text.text().trim();
                console.log(text);
                cy.log(text);
                expect(text1).to.be.equal(test.expected);
                expect(text1).contains('Sorry, this user');
                cy.contains('has BEEN', { matchCase: false});
                cy.get('.error-message-container').contains('SADface', { matchCase: false});
              });

        }

      })


   })

})

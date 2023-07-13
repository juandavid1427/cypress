/// <reference types="cypress" />

describe('My First Test Suite', function() {
    
    it('My First Test case', () => {

        // commands
        // promises 
        // asynchronous
      
        //  https://rahulshettyacademy.com/seleniumPractise/#/
        cy.visit('/');
        cy.get('.search-keyword').type('ca');
        cy.wait(2000);
        cy.get('.product').should('have.length', 5);
        // selenium get hit url in browser, cypress get acts like findElement of selenium
        cy.get('.product:visible').should('have.length', 4);

        // Parent child chaining

        cy.get('.products').as('productLocator');  // alias, to reuse later if is necessary

        cy.get('.products').find('.product').should('have.length', 4);  // find -> Get the descendent DOM elements of a specific selector.

        cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click().then(function()  {
            console.log('sf testing');  // console.log is not a command, for that reason we need to put it into a then()  to print in the correct order
        })

        console.log('sf testing 123'); // this is printed at first

        cy.get('@productLocator').find('.product').each(($el, index, $list) => {

          const textVeg = $el.find('h4.product-name').text();

            if (textVeg.includes('Cashews')) {
                cy.wrap($el).find('button').click();  // Yield the object passed into .wrap(). If the object is a promise, yield its resolved value.
                                                      // Entrega el objeto pasado a .wrap(). Si el objeto es una promesa, entrega su valor resuelto.
            }

        })

        //assert if logo text is correctly displayed
        cy.get('.brand').should('have.text','GREENKART');

        // Non cypress commands cannot resolve promise by themselves, 
        // We need to manually resolve it by then()
        
        cy.get('.brand').then( function(logoElement) {
            cy.log(logoElement.text());
        })

        cy.log('ensayis');  // it is printed in the correct order because cy.log is a command

    })

  })

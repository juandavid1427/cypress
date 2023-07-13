/// <reference types="cypress" />

describe('My Fifth Test Suite', function() {
    
    it('My Fifth Test case', () => {

        // Handling Web tables with Cypress using each command
      
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

        cy.get('tr td:nth-child(2)').each(($el, index, $list) => {

            const text = $el.text();
            if (text.includes("Python")) {
                // with next() we get the sibling of an element
                cy.get("tr td:nth-child(2)").eq(index).next().then(function(price) {
                    const priceText = price.text();
                    expect(priceText).to.equal('25');
                })

            }

        })
        
    })

})  

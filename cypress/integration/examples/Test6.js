/// <reference types="cypress" />

describe('My Sixth Test Suite', function() {
    
    it('My Sixth Test case', () => {

        // Handling Mouse hover pop-pus using Cypress
      
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

        cy.get('div.mouse-hover-content').invoke('show');
        cy.contains('Top').click({force: true});  // {force: true} is used when the element is not visible, in this case it is visible,
                                                  // but if  I comment the previous step it won't be visible
        cy.url().should('include', 'top'); 

    })

})  

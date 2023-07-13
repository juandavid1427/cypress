/// <reference types="cypress" />

describe('My Third Test Suite', function() {
    
    it('My Third Test case', () => {

        // Checkboxes
      
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1');

        cy.get('#checkBoxOption1').uncheck().should('not.be.checked');

        cy.get('input[type="checkbox"]').check(['option2', 'option3']);  // to select several checkboxes

        // dropdowns

        cy.get('select').select('option2').should('have.value', 'option2').contains( 'Option2');

        // Dynamic dropdowns
        cy.get('#autocomplete').type('ind');

        cy.get('.ui-menu-item div').each(($el, index, $list) => {
            if ($el.text()==='India') {
                cy.wrap($el).click();
            }
        });

        cy.get('#autocomplete').should('have.value', 'India'); // assertion

        // Handling Visible and invisible elements using Assertions in Cypress

        cy.get('#displayed-text').should('be.visible');
        cy.get('#hide-textbox').click();
        cy.get('#displayed-text').should('not.be.visible');
        cy.get('#show-textbox').click();
        cy.get('#displayed-text').should('be.visible');

        // radio buttons

        cy.get('[value="radio2"]').check().should('be.checked');

    })

  })

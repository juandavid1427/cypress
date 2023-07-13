/// <reference types="cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe';

describe('My Eight Test Suite', function() {
    
    it('Frame Demo example', function() {

        // Iframe
      
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

        cy.frameLoaded('#courses-iframe'); 

        cy.iframe().find("a[href*='mentorship']").eq(0).click();

        cy.wait(1000);   // if I remove this , it fails
        cy.iframe().find(".pricing-title").as('pricing');
        cy.get('@pricing').should('have.length', 2);
       
    })

})  

/// <reference types="cypress" />

describe('My Fourth Test Suite', function() {
    
    it('My Fourth Test case', () => {

        // Checkboxes
      
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.get('#alertbtn').click();
        cy.get('[value="Confirm"]').click();

        // cypres auto accepts alerts and pop ups
        // cypress have capability of browser events. window:alert is the event which get fired on alert open

        // window:alert

        cy.on('window:alert', (str) => {
            // mocha
            expect(str).to.be.equal('Hello , share this practice page and share your knowledge');
        })

        cy.on('window:confirm', (str) => {
            // mocha
            expect(str).to.be.equal('Hello , Are you sure you want to confirm?');
        })

        // it opens a new page because the attribute target  has the following:  target="_blank"
        // cy.get('#opentab').click();

        // this way it opens in the same page because we removed the attribute 'target'
        cy.get('#opentab').invoke('removeAttr','target').click();   // Invoke a function on the previously yielded subject.
 
        cy.url().should('include','qaclickacademy');

        // comes back to the previous page
         cy.go('back');  
        
  })

})  

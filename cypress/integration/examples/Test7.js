/// <reference types="cypress" />

describe('My Seventh Test Suite', function() {
    
    it('My Seventh Test case', () => {

        //rahulshettyacademy.com 
      
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

        cy.get('#opentab').then(function(el) {
            
          const url = el.prop('href');
          cy.visit(url);  // qaclickacademy.com
          
          cy.origin(url, () => {  // I can comment this and it works

            cy.get("div.sub-menu-bar a[href*='about']").click();
          });                     // if I comment the line above I need to comment this one
          
        });
       
    })

})  

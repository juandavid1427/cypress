// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//

import './beforeHooks';

Cypress.Commands.add('selectProduct', (productName) => { 
cy.get('h4.card-title').each(($el, index, $list) => {
    if ($el.text().includes(productName)){
     cy.get('button.btn.btn-info').eq(index).click();
    }
 })
})

Cypress.Commands.add('loginSauceDemo', (username, password) => { 
   cy.get('#user-name').type(username);
   cy.get('#password').type(password);
   cy.get('#login-button').click();
})

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('LoginAPI', () => { 
    cy.request("POST", "https://rahulshettyacademy.com/api/ecom/auth/login",
       {"userEmail": "rahulshetty@gmail.com", "userPassword": "Iamking@00"}).
       then(function(response) {
         expect(response.status).to.eq(200);
         Cypress.env('token', response.body.token);   // sends the value to the variable token
       })
    
    })

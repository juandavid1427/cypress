// cypress/support/beforeHooks.js
 
// is only to add this file and add the import in the commands.js

before(() => {
  cy.log('Running Before test...JD');
}); 

beforeEach(() => {
    cy.log('Running Before Each test...JD');
  }); 

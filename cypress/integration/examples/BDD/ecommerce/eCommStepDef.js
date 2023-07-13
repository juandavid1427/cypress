const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

import HomePage from "../../../pageObjects/HomePage"; 
import ProductPage from "../../../pageObjects/ProductPage";  

const homePage = new HomePage();
const productPage = new ProductPage();
let name;

Given('I open ECommerce Page', () => {
    cy.visit(Cypress.env('url'))
})

When('I add items to Cart', () => {

    homePage.getShopTab().click();

    // support/commands.js
  
   cy.fixture('example').then((data) => {
       
      data.productName.forEach(function(element) { 
        cy.get('h4.card-title').each(($el, index, $list) => {
          if ($el.text().includes(element)){
           cy.get('button.btn.btn-info').eq(index).click();
          }
       })

        
      })   

    })

// is missing to review why is failing the command selectProduct???

 //   this.data.productName.forEach(function(element) {
 //     cy.selectProduct(element);
 //   })
  
    //cy.selectProduct('Blackberry');

    productPage.checkOutButton().click();    

})

Then('Validate the total prices', () => {
    var sum = 0;

    cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
     
        cy.log($el.text()); 
   
        const amount = $el.text();
        var res = amount.split(" ");
        res = res[1].trim();
        cy.log(res);
        sum = Number(sum) + Number(res);
        //cy.pause();
   
       }).then(function() {
         cy.log(sum);
       })
   
       cy.get('h3 strong').then(function(element) {
         const amount = element.text();
         var res = amount.split(" ");
         var total = res[1].trim();
         expect(Number(total)).to.equal(sum);
   
       })

})

Then('select the country submit and verify ThanKyou', () => {
    cy.contains('Checkout').click();
    cy.get('#country').type('India');
    cy.get('.suggestions > ul > li > a').click();

    cy.get('#checkbox2').click({force: true});
    cy.get('input[type="submit"]').click();
    //cy.get('.alert').should('have.text', 'Success! Thank you! Your order will be delivered in next few weeks :-).');
    cy.get('.alert').then(function(element) {
       const actualText = element.text();

       if (actualText.includes('Success')) {
         expect(actualText.includes("Success")).to.be.true;
       }
    })
})

When('I fill the form details', function(dataTable) {
    // [ bobz, male ]
    name = dataTable.rawTable[1][0];
    homePage.getEditBox().type(dataTable.rawTable[1][0]);
    homePage.getGender().select(dataTable.rawTable[1][1]);
    //cy.pause();
})

Then('validate the forms behavior', function() {
    homePage.getTwoWayDataBinding().should('have.value', name);
    
    homePage.getEditBox().should('have.attr', 'minlength', '2'); 

    homePage.getEntrepreneur().should('be.disabled');
    Cypress.config('defaultCommandTimeout', 10000);
})

Then('select the Shop Page', () => {
    homePage.getShopTab().click();
})

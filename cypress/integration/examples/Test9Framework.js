/// <reference types="cypress" />
import HomePage from "../pageObjects/HomePage";
import ProductPage from "../pageObjects/ProductPage";


describe('My First Test Suite', function() {
    
  // comando para iniciar Jenkins:  brew services start jenkins-lts
        
  it('My First Test case', function() {
    // this default timeOut will be only apply to this test case
    //  Cypress.config('defaultCommandTimeout' , 8000)
    const homepage = new HomePage();
    const productPage = new ProductPage();

    cy.visit(Cypress.env('url'));
    cy.fixture('example').then((data)  => {
    homepage.getEditBox().type(data.name);
    homepage.getGender().select(data.gender);
   
    homepage.getTwoWayDataBinding().should('have.value', data.name);
    
    homepage.getEditBox().should('have.attr', 'minlength', '2'); 

    homepage.getEntrepreneur().should('be.disabled');
    
    // cy.pause();
    // cy.debug();

    homepage.getShopTab().click();

    // support/commands.js
    data.productName; // is an array

    data.productName.forEach(function(element) {
      cy.selectProduct(element);
    })
  })
    cy.selectProduct('Blackberry');

    productPage.checkOutButton().click();    
    var sum = 0;

    cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
     
     cy.log($el.text()); 

     const amount = $el.text();
     var res = amount.split(" ");
    
     res = res[1].trim();
     cy.log(res);
     sum = Number(sum) + Number(res);

    }).then(function() {
      cy.log(sum);
    })

    cy.get('h3 strong').then(function(element) {
      const amount = element.text();
      var res = amount.split(" ");
      var total = res[1].trim();
      expect(Number(total)).to.equal(sum);

    })


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
        
})

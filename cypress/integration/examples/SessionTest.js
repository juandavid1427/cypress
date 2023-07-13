/// <reference types="cypress" />

//const neatCSV = require('neat-csv')

//import neatCSV from 'neat-csv';    /// this is not working

let productName;

describe('JWT Session', () => {

  it('is logged in through local storage', async() => {

    cy.request("POST", "https://rahulshettyacademy.com/api/ecom/auth/login",
       {"userEmail": "juandavid@gmail.com", "userPassword": "Juanjose2005***"}).
       then(function(response) {
         expect(response.status).to.eq(200);
         Cypress.env('token', response.body.token);   // sends the value to the variable token
       }).then(function()
    {
        cy.visit("https://rahulshettyacademy.com/client",
        {
            onBeforeLoad :function(window)
            {
                window.localStorage.setItem('token',Cypress.env('token'))
            }
        })       
    })

    cy.get(".card-body b").eq(1).then(function(ele)
      {
      productName =  ele.text();
      })

    cy.get(".card-body button:last-of-type").eq(1).click();
    cy.get("[routerlink*='cart']").click();
    cy.contains("Checkout").click();
    cy.get("[placeholder*='Country']").type("ind");
    cy.get('.ta-results button').each(($el, index, $list) => {
      if($el.text()===" India")
      {
          cy.wrap($el).click()
      }
    })

    cy.get(".action__submit").click();
    cy.wait(2000);
    cy.get(".order-summary button").eq(0).click();

    

    cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_juandavid.csv")
      .then(async (text) => {

        const csv = await neatCSV(text);
        console.log(csv);
        const actualProductCSV = csv[0]["Product Name"];
        expect(productName).to.equal(actualProductCSV);
      })


  })

  })

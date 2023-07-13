/// <reference types="cypress" />

import books from '../../fixtures/books.json'

describe('My First Test Suite', function() {

   it('My first test', function() {

    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");

     cy.intercept({
        method : 'GET',
        url : 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
        }, 
        {
        statusCode : 200,
        body :[
            {
            "book_name": "RestAssured with Java",
            "isbn": "RSU",
            "aisle": "2301"
            }
        ]
     }).as('bookRetrievals');

     cy.get("button[class='btn btn-primary']").click();
     cy.wait('@bookRetrievals').then(({request, response}) => {
      debugger
       cy.get('tr').should('have.length',response.body.length+1) 
       
     })
     cy.get('p').should('have.text', 'Oops only 1 Book available');

     //length of the response array = rows of the table

   })

   it('My second test', function() {

      cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
  
       cy.intercept({
          method : 'GET',
          url : 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
          }, 
          {
          statusCode : 200,
          body : books
       }).as('bookRetrievals');
  
       cy.get("button[class='btn btn-primary']").click();
       cy.wait('@bookRetrievals').then(({request, response}) => {
        debugger
         cy.get('tr').should('have.length',response.body.length+1) 
         
       })
       cy.get('p').should('have.text', 'Oops only 1 Book available');
  
       //length of the response array = rows of the table
  
     })

     it('My third test', function() {

      cy.visit("https://rahulshettyacademy.com/angularAppdemo/");

      cy.fixture('books').then( (data) => {
  
       cy.intercept({
          method : 'GET',
          url : 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
          }, 
          {
          statusCode : 200,
          body : data
       }).as('bookRetrievals');

      })
  
       cy.get("button[class='btn btn-primary']").click();
       cy.wait('@bookRetrievals').then(({request, response}) => {
        debugger
         cy.get('tr').should('have.length',response.body.length+1) 
         
       })
       cy.get('p').should('have.text', 'Oops only 1 Book available');
  
       //length of the response array = rows of the table
  
     })

})

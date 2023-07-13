
describe("API testing", () => {

    const queryParam= { page:2 }

    it("Passing query parameters", () => {
 
      cy.request({
        method: 'GET',
        url: 'https://reqres.in/api/users',
        qs: queryParam
      }).then((response) => {
        debugger
        expect(response.status).to.eq(200);
        expect(response.status).equal(200);
        expect(response.body.page).to.eq(2);
        expect(response.body.total_pages).to.eq(2);
        expect(response.body.data).has.length(6);
        expect(response.body.data[0].email).to.equal("michael.lawson@reqres.in");
        expect(response.body.data[0]).have.property('id', 7);
        expect(response.body.data[0]).has.property('first_name', 'Michael');
        expect(response.body.data[0].first_name).to.equal('Michael');
        expect(response.body.data[1].avatar).to.equal('https://reqres.in/img/faces/8-image.jpg');
      })
  
    })

})

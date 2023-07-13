/*
POST https://gorest.co.in/public/v2/users
PUT  https://gorest.co.in/public/v2/users/${userId}
DELETE https://gorest.co.in/public/v2/users/${userId}
*/


describe("Gorest API chaining", () => {

    const auth_token = 'Bearer 23424aad43fdf3434sdd2423';

    it("create, update, delete user in Gorest API", () => {

       cy.request({
         method: 'POST',
         url: 'https://gorest.co.in/public/v2/users',
         body: {
            name: 'Juan Hernandez',
            gender: 'male',
            email: Math.random().toString(5).substring(2) + "@gmail.com",
            status: 'active'
         },
         headers: {
            Authorization: auth_token
         }
       })
       .then((response) => {
          expect(response.status).to.eq(201);
          const userId = response.body.id;
          // update user name
          cy.request({
            method: 'PUT',
            url: `https://gorest.co.in/public/v2/users/${userId}`,
            body: {
                name: 'Scott'
            },
            headers: {
                Authorization: auth_token
            }
          })
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.name).to.equal('Scott');
            //delete resource
            cy.request({
                method: 'DELETE',
                url: `https://gorest.co.in/public/v2/users/${userId}`,
                headers: {
                    Authorization: auth_token
                }
            })
            .then((response) => {
                expect(response.status).to.equal(204)
            })

          })

       })

    })

})

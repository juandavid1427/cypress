describe("Parsing JSON Response", () => {

   it("Parsing simple JSON response", () => { 
        cy.request({
            method: 'GET',
            url: 'https://fakestoreapi.com/products',
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body[0].id).to.eq(1);
            expect(response.body[0].title).to.eq("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops");
            expect(response.body[0].price).to.eq(109.95);
            expect(response.body[0].rating.rate).to.eq(3.9);

            expect(response.body[19].id).to.eq(20);
            expect(response.body[19].title).to.eq("DANVOUY Womens T Shirt Casual Cotton Short");
            expect(response.body[19].price).to.eq(12.99);
            expect(response.body[19].rating.rate).to.eq(3.6);
        })
 
    })

    it.only("Parsing complex JSON response without limit", () => { 
        
        let totalPrice = 0;

        cy.request({
            method: 'GET',
            url: 'https://fakestoreapi.com/products',
        }).then((response) => {
            debugger
            expect(response.status).to.equal(200);

            response.body.forEach(element => {
                totalPrice = totalPrice + element.price;
                
            });
            expect(totalPrice).to.eq(3240.9199999999987)
            
        })
 
    })
    
    it.only("Parsing complex JSON response", () => { 
        
        let totalPrice = 0;

        cy.request({
            method: 'GET',
            url: 'https://fakestoreapi.com/products',
            qs: { limit: 5}
        }).then((response) => {
            expect(response.status).to.equal(200);

            response.body.forEach(element => {
                totalPrice = totalPrice + element.price;
                
            });
            expect(totalPrice).to.eq(899.23)
            
        })
 
    })
 
})

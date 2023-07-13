describe("http request", () => {

    it("Approach1 - Hard coded json object", () => { // if this fails is due that we need to change the parameters tourist_name and tourist_email

      const requestBody = {
        "tourist_name": "Mike4",
        "tourist_email": "juan987@gmail.com",
        "tourist_location": "Paris"
      }  

      cy.request({
        method: 'POST',
        url: 'http://restapi.adequateshop.com/api/Tourist',
        body: requestBody
      }).then((response) => {
        debugger
        expect(response.status).to.eq(201)
        expect(response.body.tourist_name).to.eq("Mike4")
        expect(response.body.tourist_email).to.eq("juan987@gmail.com")
        expect(response.body.tourist_location).to.eq("Paris")
      })

    })  

    it("Approach2 - Dynamically generating json object", () => {

      const requestBody = {
        "tourist_name": Math.random().toString(5).substring(2),
        "tourist_email": Math.random().toString(5).substring(2) + "@gmail.com",
        "tourist_location": "Paris"
      }  

      cy.request({
        method: 'POST',
        url: 'http://restapi.adequateshop.com/api/Tourist',
        body: requestBody
      }).then((response) => {
        debugger
        expect(response.status).to.eq(201)
        expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
        expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
        expect(response.body.tourist_location).to.eq(requestBody.tourist_location)
      })

    })  

    it("Approach3 - using Fixture", () => { // if this fails is due that we need to change the parameters tourist_name and tourist_email in the fixture json
      
      cy.fixture('tourist').then((data) => {
        debugger
        const requestBody = data;

        cy.request({
          method: 'POST',
          url: 'http://restapi.adequateshop.com/api/Tourist',
          body: requestBody
        }).then((response) => {
          debugger
          expect(response.status).to.eq(201)
          expect(response.body.tourist_name).to.eq(requestBody.tourist_name) // here we can put (data.tourist_name)
          expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
          expect(response.body.tourist_location).to.eq(requestBody.tourist_location)
          expect(response.body).has.property('tourist_email', requestBody.tourist_email)
          expect(response.body).to.have.property('tourist_email', requestBody.tourist_email)
        })
  
      })
    
    })
    
  })

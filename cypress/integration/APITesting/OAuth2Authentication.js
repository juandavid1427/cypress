
// Pre-requisite: generate Auth code
//https://github.com/login/oauth/authorize/{client_id}
//https://github.com/login/oauth/authorize/{client_id=khihuyoiu88767}

// 1) Get the OAuth2 access token
/* POST: https://github.com/login/oauth/access_token

Query params
   -----
   client_id
   client_secret
   code

2) Send GET request by using access token.
https://api.github.com/user/repos
  Auth: access_token

*/

describe("OAuth2", () => {  // this doesn't work due that we have the wrong credentials

    let access_token = "";

    it("get OAuth2", () => {

        cy.request({
            method: "POST",
            url:"https://github.com/login/oauth/access_token",
            qs: {
                client_id: 'fe9c5cddb7e01d747b4611c3fc9eaf2c',
                client_secret: '234342423412ddfa',
                code: '32432432lkh323243232kl4' 
            }  
    
        }).then((response) => {
            // acces_token=asdfddfdsafdsafd&scope=&token_type=bearer
            const params =response.body.split('&');
            access_token = params[0].split("=")[1];
            cy.log("Generated token is: " + access_token);

        })
    
    })

      it("OAuth2 request", () => {

        cy.request({
            method: "GET",
            url:"https://github.com/users/repos",
            headers: {
                Authorization: 'Bearer ' + access_token,
            }  
    
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0].id).to.equal(201070920);

        })
    
      })

}) 

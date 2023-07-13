// Install ajv library
// npm install ajv     - command prompt/terminal

const Ajv = require('ajv')
const avj = new Ajv()

describe("Schema validation", () => {

   it("schema validation against response", () => {

      cy.request({
        method: 'GET',
        url: 'https://fakestoreapi.com/products',
      }).then((response) => {
        var schema = {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "array",
            "items": [
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer"
                  },
                  "title": {
                    "type": "string"
                  },
                  "price": {
                    "type": "number"
                  },
                  "description": {
                    "type": "string"
                  },
                  "category": {
                    "type": "string"
                  },
                  "image": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "object",
                    "properties": {
                      "rate": {
                        "type": "number"
                      },
                      "count": {
                        "type": "integer"
                      }
                    },
                    "required": [
                      "rate",
                      "count"
                    ]
                  }
                },
                "required": [
                  "id",
                  "title",
                  "price",
                  "description",
                  "category",
                  "image",
                  "rating"
                ]
              }
            ] 
          }  // schema end
        
          const validate = avj.compile(schema);
          const isValid = validate(response.body);
          expect(isValid).to.be.true;
      })

   })

})

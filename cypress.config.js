const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');


async function setupNodeEvents(on, config) {
  // implement node event listeners here
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));

   
  on('task', {
    excelToJsonConverter(filePath)
    {
      const result = excelToJson({
        source: fs.readFileSync(filePath) // fs.readFileSync return a Buffer
      });
      return result;
    }
  })


  return config;
}

module.exports = defineConfig({

  defaultCommandTimeout: 10000,
  env: {
    url : "https://rahulshettyacademy.com/angularpractice/",
  },
  retries: {
    runMode: 2,
    openMode: 2,
  },
 
  projectId: "9obzfh",
  e2e: {
     setupNodeEvents(on, config) {
       const file = config.env.name || "default";
       config.env = require(`./cypress/config/${file}.json`);
       config.baseUrl = config.env.baseUrl;

       return config;
     },
    //setupNodeEvents,
    specPattern: '/Users/juan.munozv/Desktop/CypressAutomation/cypress/integration/examples/*.js',
    //specPattern: '/Users/juan.munozv/Desktop/CypressAutomation/cypress/integration/APITesting/*.js',
    //specPattern: '/Users/juan.munozv/Desktop/CypressAutomation/cypress/integration/examples/BDD/*.feature',
    //specPattern: '**/*.feature',
    //supportFile: false,
    chromeWebSecurity: false,
    
    compilerOptions: {
      experimentalModuleImports: true
    }
  },
});

//json file

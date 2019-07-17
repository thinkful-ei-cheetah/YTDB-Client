/// <reference types="Cypress" />

/**
 * @abstract:Feedback to my answer
 *
 * @criteria
  After submitting an answer on the learning page as a logged in user:
  - The app POSTs my answer for this word to the server
  - The server will update my appropriate scores in the database
  - After submitting, I get feedback whether I was correct or not
  - After submitting, I'm told the correct answer
  - My total score is updated
  - I'm told how many times I was correct or incorrect for the word
  - I can see a button/link to try another word
*/
describe(`User story: Answer feedback`, function() {

  context(`Given I submit my answer`, () => {

    it(`submits my answer typed in the form`, () => {

        const response = [];
        beforeEach(function () {
            // reset and seed the database prior to every test
            cy.request('GET', 'http://localhost:8001/api/channels/search/guardian/false').then(fx => console.log(fx))
          })

          console.log(response)


     // const guess = 'guardian'
     Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })

      cy.login().visit(`/`)

      cy.get('form#search-form').within($form => {
        cy.get('input#search-input')
          .type('guardian')

        cy.get('button').click()

       

      })
    })
  })
})
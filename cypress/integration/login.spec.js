/// <reference types="Cypress" />
import * as helpers from '../support/helpers'

/**
 * @abstract: Login
 *
 * @criteria
  On any visit when I'm not logged in:
  - I can navigate to the "login" page.

  As a registered user on the login page:
  - I can navigate back to the register page.
  - I can enter my username and password.
  - If my submitted username and password are incorrect: I'm given an appropriate error message so that I can attempt to login again.
  - If my submitted username and password are correct: the app "logs me in" and redirects me to my dashboard.

  As a logged in user:
  - The app displays my name and presents a logout button.
  - The application refreshes my auth token so that I can remain logged in when active on the page.

  As a logged in user who is starting a new session:
  - The application remembers that I'm logged in and doesn't redirect me to the registration page.
*/
describe(`User story: Login`, function() {
  it(`has navigation to login page in nav and form`, () => {
    cy.visit('/')

    cy.get('header nav').within($nav => {
      cy.get('a[href="/login"]')
        .should('be.visible')
        .and('have.text', 'Login')
    })
  })

  it(`allows navigation back to the registration page`, () => {
    cy.visit('/login')
      .get('a[href="/register"]')
      .should('be.visible')
      .and('have.text', 'Sign up')
  })

  it('displays the login page', () => {
    cy.visit('/login')

    cy.get('main section').within($section => {
      cy.get('h2').should(
        'have.text',
        'Login',
      )
    })
  })

  it(`displays the username and password fields`, () => {
    cy.visit('/login')

    cy.get('section form').within(() => {
      cy.get('label[for=login-username-input]')
        .should('have.text', 'Username')
      cy.get('input#login-username-input')
        .should('have.attr', 'type', 'text')
        .and('have.attr', 'required', 'required')

      cy.get('label[for=login-password-input]')
        .should('have.text', 'Password')
      cy.get('input#login-password-input')
        .should('have.attr', 'type', 'password')
        .and('have.attr', 'required', 'required')

      cy.get('button[type=submit]')
        .should('have.text', 'Login')
    })
  })

})
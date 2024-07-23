/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes("setting 'onclick'") ) {
    return false
  }
  if (err.message.includes("setting 'textContent'") ) {
      return false
    }
  if (err.message.includes("reading 'document'") ) {
      return false
    }
  if (err.message.includes("reading 'addEventListener'") ) {
      return false
    }
  return true
})

describe('Login Page Suite', () => {
  beforeEach(() => {

    cy.visit('http://localhost:3000/')
  })

  it('displays Login Page', () => {
    cy.get('.login-right > h1').should('have.text', 'PunchNPay')
  })
  
  it('shows error when email text box is empty', () => {  
    cy.get("#password").type("123", { log: false })

    cy.get("#login-button").click()
    cy.get('#error_issue', {timeout: 50000})
    .should('have.text', 'Incorrect Credentials!')
  })

  it('shows error when password text box is empty', () => {  
    cy.get("#email").type("john_doe@gmail.com")

    cy.get("#login-button").click()
    cy.get('#error_issue', {timeout: 50000})
    .should('have.text', 'Incorrect Credentials!')
  })

  it('shows error when inputing incorrect credentials', () => {  
    cy.get("#email").type("does_not_exist@gmail.com")
    cy.get("#password").type("123", { log: false })
    cy.get("#login-button").click()
        

    cy.get('#error_issue', {timeout: 50000})
    .should('have.text', 'Incorrect Credentials!')
  })

  it("should login if the credentials are correct", () => {
        cy.get("#email").type("john_doe@gmail.com")
        cy.get("#password").type("123", { log: false })
        cy.get("#login-button").click()
        
        cy.url().should("include", "/employee_clockpage")

  })
})

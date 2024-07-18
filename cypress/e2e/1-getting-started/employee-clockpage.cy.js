/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes("setting 'onclick'") ) {
    return false
  }
  if (err.message.includes("setting 'textContent'") ) {
      return false
    }
  return true
})


describe('Employee Clockpage Test Suite', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
      cy.get("#email").type("john_doe@gmail.com")
      cy.get("#password").type("123", { log: false })
      cy.get("#login-button").click()
    })

  
  it ("should not disable the time-in button", () => {
    cy.get("#time-in-btn").should('not.be.disabled')
  })

  it ("should disable the time-out button if not yet timed-in", () => {
    cy.get("#time-out-btn").should('be.disabled')
  })

  it("should show a pop-up for time-in", () => {
    cy.get("#time-in-btn").click()

    cy.get("#popup-3 .content h1").should("contain.text", 'Time In Successful')

    cy.get("#popup-3 .close-btn").click()
  })

  it ("should disable the time-in button after timing in", () => {
    cy.get("#time-in-btn").should('be.disabled')
  })

  it ("should enable the time-out button once timed-in", () => {
    cy.get("#time-out-btn").should('not.be.disabled')
  })


  it("should show a pop-up for time-out", () => {
    cy.get("#time-out-btn").click()

    cy.get("#popup-4 .content h1").should("contain.text", 'Time Out Successful')

    cy.get("#popup-4 .close-btn").click()
  })

  it('should be able to access the company notification page', () =>{
    cy.get(".employee_notification").click()
    cy.url().should("include", "/employee_notification")
  })  


  it('should be able to access the employee dashboard page', () =>{
    cy.get(".employee_dashboard").click()
    cy.url().should("include", "/employee_dashboard")
  })  

  it("should log-out", () => {
    cy.get(".admin-rightdash-bottom h2").click()
    cy.url().should("include", "http://localhost:3000")

  })
  

  })
  
/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes("setting 'onclick'")) {
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
        cy.get(".employee_dashboard").click()
      })
  
    
    it('should show the employee dashboard', () =>{
        cy.url().should("include", "/employee_dashboard")
      })

    it('should be able to access the company notification page', () =>{
        cy.get(".employee_notification").click()
        cy.url().should("include", "/employee_notification")
      })  

    it('should be able to access the employee clockpage page', () =>{
        cy.get(".employee_clockpage").click()
        cy.url().should("include", "/employee_clockpage")
      })  
    
    it("should log-out", () => {
      cy.get(".admin-rightdash-bottom h2").click()
  
      cy.url().should("include", "http://localhost:3000")
  
    })
    
  
    })
    
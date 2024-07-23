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
  
  describe('Employee Notification Test Suite', () => {
      beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.get("#email").type("john_doe@gmail.com")
        cy.get("#password").type("123", { log: false })
        cy.get("#login-button").click()
        cy.get(".employee_notification").click()
      })

      it('should navigate through pagination', () => {

        cy.get('.pagination .page-btn').contains('2').click()
    
        cy.get('.pagination .page-btn')
          .contains('2')
          .should('have.css', 'font-weight')
          .and('eq', '700')
    
        cy.get('.pagination .page-btn').contains('1').click()
    
        cy.get('.pagination .page-btn')
          .contains('1')
          .should('have.css', 'font-weight')
          .and('eq', '700')
    
      })

      it('should verify pagination behavior', () => {
        cy.get('.pagination .page-btn').contains('3').click()
    
        cy.get('.pagination .page-btn')
          .contains('3')
          .should('have.css', 'font-weight')
          .and('eq', '700')
    
        cy.get('.timeline-item').should('have.length.greaterThan', 0)
      })
  
    it('should display notifications', () => {
        cy.get('.timeline-item').first().within(() => {
        cy.get('.timeline-date').should('exist')
        cy.get('.timeline-message').should('exist')
        })
      })

    it('should display other paignation notifications', () => {
        cy.get('.pagination .page-btn').contains('2').click()
        
        cy.get('.timeline-item').first().within(() => {
        cy.get('.timeline-date').should('exist')
        cy.get('.timeline-message').should('exist')
        })
      })


    it('should show the company notification page', () =>{
        cy.url().should("include", "/employee_notification")
      })

    it('should be able to access the employee dashboard page', () =>{
        cy.get(".employee_dashboard").click()
        cy.url().should("include", "/employee_dashboard")
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
    
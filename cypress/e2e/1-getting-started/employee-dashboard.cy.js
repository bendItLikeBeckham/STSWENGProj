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

    it('should show the table for current week', () => {
        cy.wait(1000); 
        cy.get('#emp-dropdown-week-id').select('Current Week').should('have.value', 'Current Week');
        checkTable('Current Week');
      })
      
    it('should show the table for last week', () => {
        cy.wait(1000); 
        cy.get('#emp-dropdown-week-id').select('Last Week').should('have.value', 'Last Week');
        checkTable('Last Week');
      })  

    it('should show the table for 2 weeks ago', () => {
        cy.wait(1000); 
        cy.get('#emp-dropdown-week-id').select('2 Weeks Ago').should('have.value', '2 Weeks Ago');
        checkTable('2 Weeks Ago');
      })  
    
    
    it("should log-out", () => {
      cy.get(".admin-rightdash-bottom h2").click()
      cy.url().should("include", "http://localhost:3000")
    })    
  

    function checkTable(week) {
      cy.get('table').within(() => {
        cy.contains('th', 'Time-In').should('exist')
        cy.contains('th', 'Time-Out').should('exist')
        cy.contains('th', 'Total Time').should('exist')
        cy.contains('th', 'Total Valid Hours').should('exist')
        cy.contains('th', 'Total Hour Rate').should('exist')
        cy.contains('th', 'Total Day Pay').should('exist')
    
          cy.get('td').eq(1).should('not.contain', 'N/A') 
          cy.get('td').eq(2).should('not.contain', 'N/A') 
          cy.get('td').eq(3).should('not.contain', 'N/A') 
          cy.get('td').eq(4).should('not.contain', 'N/A') 
          cy.get('td').eq(5).should('not.contain', 'N/A')
          cy.get('td').eq(6).should('not.contain', 'N/A') 
      })
    
    }

    })
    
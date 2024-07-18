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
  


describe('Application Exploration Admin Test', () =>{
    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.get("#email").type("adminusertest111@gmail.com")
        cy.get("#password").type("123", { log: false })
        cy.get("#login-button").click()
      })

      it('should log-in to correct page', () =>{
        cy.url().should("include", "/admin_dashboard")
      })

      it('should go to employee management', () =>{
        cy.get('#emp-mgm-id').click()
        cy.url().should("include", "/admin_empman_attendrecs")
      })

      it('should go to delete employee', () =>{
        cy.get('#adm-dlt').click()
        cy.get('.admin-leftdash-top > h2').should('have.text', "Add/Delete Employee")
      })

      it('should go to notifications', () =>{
        cy.get('#adm-not').click()
        cy.get('.left-payroll > h1').should('have.text', "Notifications")
      })

      

      /*it('should go to employee records', () =>{
        cy.get('#dropdown').click()
        cy.get('#adm_rec').click()

        cy.url().should("include", "/admin_empman_emprecs")
      })
      
      it('should go to employee payroll', () =>{
        cy.get('#dropdown').click()
        cy.get('#adm_rec').click()

        cy.url().should("include", "/admin_empman_payroll")
      })*/

      it("should log-out", () => {
        cy.get(".admin-rightdash-bottom h2").click()
    
        cy.url().should("include", "http://localhost:3000")
    
      })
})  

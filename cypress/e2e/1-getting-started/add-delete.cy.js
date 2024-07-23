/// <reference types="cypress" />


Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes("setting 'onclick'") ) {
      return false
    }
    if (err.message.includes("reading 'addEventListener'") ) {
        return false
      }
    if (err.message.includes("setting 'textContent'") ) {
        return false
      }
    return true
  }) 

  describe('Admin Add/Delete User Test', () =>{
      beforeEach(() => {
          cy.visit('http://localhost:3000')
          cy.get("#email").type("adminusertest111@gmail.com")
          cy.get("#password").type("123", { log: false })
          cy.get("#login-button").click()
          cy.get('#adm-dlt').click()
        })

        describe('Admin Add Suite', () => {
            it('should render register page', () =>{
                cy.url().should('include', '/register');
            })   
            
            it("should log-out", () => {
                cy.get(".admin-rightdash-bottom h2").click()
            
                cy.url().should("include", "http://localhost:3000")
            
              })
        })

        describe('Admin Delete Suite', () => {
            beforeEach(() => {
                cy.get('.dropdown-page select').select('delete_user');
            })

            it('should render delete page', () =>{
                cy.url().should('include', '/delete_user');
            })   
            
            it("should log-out", () => {
                cy.get(".admin-rightdash-bottom h2").click()
            
                cy.url().should("include", "http://localhost:3000")
            
              })
        })
  
        

        
  })  
  
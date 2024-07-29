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
    
  
  
  describe('Admin Employee Information Test', () =>{
      beforeEach(() => {
          cy.visit('http://localhost:3000')
          cy.get("#email").type("adminusertest111@gmail.com")
          cy.get("#password").type("123", { log: false })
          cy.get("#login-button").click()
          cy.wait(2000); 
          cy.get('#emp-mgm-id').click()
        })
  
        it('should log-in to correct page', () =>{
          cy.url().should("include", "/admin_empman_emprecs")
        })

        it("should show existing employee named John Doe and can be accessed", () => {
            cy.get('#selectedEmployee')
                .find('option')
                .contains('john_doe@gmail.com')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });
    
            cy.get('#selectedEmployee').should('have.value', 'john_doe@gmail.com');
        });

        it("should show complete information on employee named John Doe", () => {
            cy.get('#selectedEmployee')
                .find('option')
                .contains('john_doe@gmail.com')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });
    
            cy.get('.left-emp-info h1').should('contain', 'John Doe');
            cy.get('.left-emp-info h5').should('contain', 'Employee');

            cy.get('.right-emp-info p').eq(0).should('contain', 'NEW TEST AVENUE');
            cy.get('.right-emp-info p').eq(1).should('contain', '09753606368'); 
            cy.get('.right-emp-info p').eq(2).should('contain', 'john_doe@gmail.com');
            cy.get('.right-emp-info p').eq(3).should('contain', '123');
        });

        it("should navigate to weekly payroll", () => {
            cy.get('#dropdown').select('admin_empman_payroll');
            cy.url().should('include', '/admin_empman_payroll');
        });
    
  
        it("should log-out", () => {
          cy.get(".admin-rightdash-bottom h2").click()
      
          cy.url().should("include", "http://localhost:3000")
      
        })
  })  
  
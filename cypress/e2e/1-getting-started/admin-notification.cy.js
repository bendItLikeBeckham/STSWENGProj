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
    if (err.message.includes("reading 'document'") ) {
        return false
      }
    return true
  }) 

  describe('Admin Notification Test', () =>{
      beforeEach(() => {
          cy.visit('http://localhost:3000')
          cy.get("#email").type("adminusertest111@gmail.com")
          cy.get("#password").type("123", { log: false })
          cy.get("#login-button").click()
          cy.get('#adm-not').click()
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

        it('should send a notification and verify it appears in the list', () => {
            const testMessage = 'This is a test notification';
    
            cy.get('#message').type(testMessage);
    
            cy.get('.send-notification-button').click();
    
            cy.get('.notification-timeline').should('contain', testMessage);
        });

        it('should delete a notification and validate if it is removed from the list', () => {
            const messageToDelete = 'This is a test notification';

            cy.get('.pagination .page-btn').contains('5').click()
    
            cy.get('.notification-timeline').should('contain', messageToDelete);
    
            cy.contains('.timeline-item', messageToDelete)
              .find('.delete')
              .click();
    
            cy.get('.notification-timeline').should('not.contain', messageToDelete);
        });
    
        it("should log-out", () => {
            cy.get(".admin-rightdash-bottom h2").click()
        
            cy.url().should("include", "http://localhost:3000")
        
          })
          
  
        

        
  })  
  
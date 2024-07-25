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

        describe('Admin Add', () => {
            it('should render register page', () =>{
                cy.url().should('include', '/register');
            })
            
            it("should show error in adding a user with incomplete fields", () =>{

              cy.get('.ad-leftdash-btn').click();


              cy.get('#popup-2 #register-button').click();

                cy.on('window:alert', (str) => {
                  expect(str).to.equal('Please fill in all fields');
              });
            })

            it("should show error in adding a user with invalid contact number format", () =>{

              cy.get('input[name="firstName"]').type('Test');
              cy.get('input[name="lastName"]').type('This A Test');
              cy.get('input[name="address"]').type('123 Main St');
              cy.get('input[name="contactNumber"]').type('09757');
              cy.get('input[name="email"]').type('atest@gmail.com');
              cy.get('input[name="password"]').type('123');
              cy.get('select[name="employeeType"]').select('Employee');

              cy.get('.ad-leftdash-btn').click();


              cy.get('#popup-2 #register-button').click();

              cy.on('window:alert', (str) => {
                expect(str).to.equal('Invalid contact number format');
            });
            })

            it("should correctly add a user", () =>{

              cy.get('input[name="firstName"]').type('Test');
              cy.get('input[name="lastName"]').type('This A Test');
              cy.get('input[name="address"]').type('123 Main St');
              cy.get('input[name="contactNumber"]').type('09754606327');
              cy.get('input[name="email"]').type('atest@gmail.com');
              cy.get('input[name="password"]').type('123');
              cy.get('select[name="employeeType"]').select('Employee');

              cy.get('.ad-leftdash-btn').click();


              cy.get('#popup-2 #register-button').click();

              cy.get('#popup-3 .close-btn').click();
              cy.get('#popup-3').should('not.be.visible');
            })
            
            it("should log-out", () => {
                cy.get(".admin-rightdash-bottom h2").click()
            
                cy.url().should("include", "http://localhost:3000")
            
              })
        })

        describe('Admin Delete', () => {
            beforeEach(() => {
                cy.get('.dropdown-page select').select('delete_user');
            })

            it('should render delete page', () =>{
                cy.url().should('include', '/delete_user');
            })   

            it("should show error in deleting a user without choosing one", () =>{

              cy.get('.ad-leftdash-btn').click();
              cy.get('#popup-2 #user-delete-button').click();

                cy.on('window:alert', (str) => {
                  expect(str).to.equal('Please input a user to delete');
              });
            })

            it("should show existing employee test and can be deleted", () => {
              cy.get('#email').select('atest@gmail.com'); 

              cy.get('.right-emp-info').should('contain', 'atest@gmail.com');

              cy.get('.ad-leftdash-btn').click();

              cy.get('#popup-2 #user-delete-button').click();


              // Close the success popup
              cy.get('#popup-3 .close-btn').click();
              cy.get('#popup-3').should('not.be.visible');

            });
  
            
            it("should log-out", () => {
                cy.get(".admin-rightdash-bottom h2").click()
            
                cy.url().should("include", "http://localhost:3000")
            
              })
        })
  
        

        
  })  
  
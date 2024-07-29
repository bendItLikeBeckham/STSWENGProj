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

  describe('Employee Edit Test Suite', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
      cy.get("#email").type("john_doe@gmail.com")
      cy.get("#password").type("123", { log: false })
      cy.get("#login-button").click()
      cy.get(".employee_edit").click()
    })

    it('should render edit page', () =>{
        cy.url().should('include', '/employee_edit');
    })

    it('should show an alert for a successful edit', () =>{
        cy.get('#Contact_Number').type('09753606368');
        cy.get('#Password').type('123');
        cy.get('#Address').type('NEW TEST AVENUE');

        cy.get('.submit_edit').click();

        cy.on('window:alert', (text) => {
            expect(text).to.contains('Employee updated successfully!');
        });
    })

  
  it("should log-out", () => {
    cy.get(".admin-rightdash-bottom h2").click()

    cy.url().should("include", "http://localhost:3000")

  })
  

  })

  describe('Admin Edit Test Suite', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
      cy.get("#email").type("adminusertest111@gmail.com")
      cy.get("#password").type("123", { log: false })
      cy.get("#login-button").click()
      cy.get('#adm-edit').click()
    })

    it('should render edit page', () =>{
        cy.url().should('include', '/edit_user');
    })

    it('should an error message that says user does not exist in edit page', () =>{
      cy.get('#Email').type('doesntexist@gmail.com');
        cy.get('.submit_edit').contains('Search').click();
      
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Employee not found.');
    });
  })

    it('should show an alert for a successful edit', () =>{

        cy.get('#Email').type('john_doe@gmail.com');
        cy.get('.submit_edit').contains('Search').click();

        cy.get('#Contact_Number').clear().type('09753606368');
        cy.get('#Password').clear().type('123');
        cy.get('#Address').clear().type('ADMIN NEW TEST AVENUE');

        cy.get('.submit_edit').contains('Save').click();

        cy.on('window:alert', (text) => {
            expect(text).to.contains('Employee updated successfully!');
        });
    })

  
  it("should log-out", () => {
    cy.get(".admin-rightdash-bottom h2").click()

    cy.url().should("include", "http://localhost:3000")

  })
  

  })

  
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

  describe('Admin Employee Payroll Test', () =>{
      beforeEach(() => {
          cy.visit('http://localhost:3000')
          cy.get("#email").type("adminusertest111@gmail.com")
          cy.get("#password").type("123", { log: false })
          cy.get("#login-button").click()
          cy.wait(2000); 
          cy.get('#emp-mgm-id').click()
          cy.get('#dropdown').find('option').contains('Weekly Payroll').then(option => {cy.wrap(option).parent().select(option.val());});
        })

  
        it('should log-in to correct page', () =>{
            cy.url().should('include', '/admin_empman_payroll');
        })

        it("should show existing employee named John Doe and can be accessed", () => {
            cy.get('#emp-dropdown-id')
                .find('option')
                .contains('john_doe@gmail.com')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });
    
            cy.get('#emp-dropdown-id').should('have.value', 'john_doe@gmail.com');
        });

        it("should show the dropdown that allows the user to click a week", () => {
            cy.get('#emp-dropdown-id')
                .find('option')
                .contains('john_doe@gmail.com')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });
    
            cy.get('#select-week-dropdown-id').should('exist');
        });

        it("should be able to click the table for current week", () => {
            cy.get('#emp-dropdown-id')
                .find('option')
                .contains('john_doe@gmail.com')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });
    
            cy.get('#select-week-dropdown-id')
                .find('option')
                .contains('Current Week')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });
        });

        it("should have a window alert for when inputting without choosing an employee and week", () => {
            cy.get("#pph-id").type("-10")
            cy.on('window:alert', (str) => {
                expect(str).to.equal('Select a week and an employee first.');
            });

            cy.get("#add-id").type("-10")
            cy.on('window:alert', (str) => {
                expect(str).to.equal('Select a week and an employee first.');
            });

            cy.get("#adv-id").type("-10")
            cy.on('window:alert', (str) => {
                expect(str).to.equal('Select a week and an employee first.');
            });

            cy.get("#ded-id").type("-10")
            cy.on('window:alert', (str) => {
                expect(str).to.equal('Select a week and an employee first.');
            });
        });


        it("should have a window alert for when not inputting a valid non-negative integer", () => {
            cy.get('#emp-dropdown-id')
                .find('option')
                .contains('john_doe@gmail.com')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });
    
            cy.get('#select-week-dropdown-id')
                .find('option')
                .contains('Current Week')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });

            cy.get("#pph-id").type("-10")
            cy.on('window:alert', (str) => {
                expect(str).to.equal('Please enter a valid non-negative integer.');
            });

            cy.wait(100);

            cy.get("#add-id").type("-10")
            cy.on('window:alert', (str) => {
                expect(str).to.equal('Please enter a valid non-negative integer.');
            });

            cy.get("#adv-id").type("-10")
            cy.on('window:alert', (str) => {
                expect(str).to.equal('Please enter a valid non-negative integer.');
            });

            cy.get("#ded-id").type("-10")
            cy.on('window:alert', (str) => {
                expect(str).to.equal('Please enter a valid non-negative integer.');
            });
        });

        it("should have non-empty payroll data for Current Week Advance, Additional, Deduction, and Total Weekly Pay", () => {
            cy.get('#emp-dropdown-id')
                .find('option')
                .contains('john_doe@gmail.com')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });
    
            cy.get('#select-week-dropdown-id')
                .find('option')
                .contains('Current Week')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });

            cy.get('.empman-btm')
                .within(() => {
                    cy.get('p').contains('Additional').invoke('text').should('match', /₱\d+/);
                    cy.get('p').contains('Advance').invoke('text').should('match', /₱\d+/); 
                    cy.get('p').contains('Deduction').invoke('text').should('match', /₱\d+/);
                    cy.get('h1').contains('Total Weekly Pay').invoke('text').should('match', /₱\d+/);
                });
        });

        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        daysOfWeek.forEach(day => {
            it(`should have non-empty payroll data for current week ${day}`, () => {
                cy.get('#emp-dropdown-id')
                .find('option')
                .contains('john_doe@gmail.com')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });
    
                cy.get('#select-week-dropdown-id')
                .find('option')
                .contains('Current Week')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });

                cy.get('table#weekly-payroll-table-id')
                    .contains('tr', day)
                    .within(() => {
                        cy.get('td').eq(1).should('not.be.empty'); 
                        cy.get('td').eq(2).should('not.be.empty'); 
                        cy.get('td').eq(3).should('not.be.empty'); 
                        cy.get('td').eq(4).should('not.be.empty'); 
                        cy.get('td').eq(5).should('not.be.empty'); 
                        cy.get('td').eq(6).should('not.be.empty'); 
                    });
            });
        });

        it("should be able to click the table for last week", () => {
            cy.get('#emp-dropdown-id')
                .find('option')
                .contains('john_doe@gmail.com')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });
    
            cy.get('#select-week-dropdown-id')
                .find('option')
                .contains('Last Week')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });
        });

        it("should have non-empty payroll data for Last Week Advance, Additional, Deduction, and Total Weekly Pay", () => {
            cy.get('#emp-dropdown-id')
                .find('option')
                .contains('john_doe@gmail.com')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });
    
            cy.get('#select-week-dropdown-id')
                .find('option')
                .contains('Last Week')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });

            cy.get('.empman-btm')
                .within(() => {
                    cy.get('p').contains('Additional').invoke('text').should('match', /₱\d+/);
                    cy.get('p').contains('Advance').invoke('text').should('match', /₱\d+/);
                    cy.get('p').contains('Deduction').invoke('text').should('match', /₱\d+/);
                    cy.get('h1').contains('Total Weekly Pay').invoke('text').should('match', /₱\d+/); 
                });
        });

        daysOfWeek.forEach(day => {
            it(`should have non-empty payroll data for last week ${day}`, () => {
                cy.get('#emp-dropdown-id')
                .find('option')
                .contains('john_doe@gmail.com')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });
    
                cy.get('#select-week-dropdown-id')
                .find('option')
                .contains('Last Week')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });

                cy.get('table#weekly-payroll-table-id')
                    .contains('tr', day)
                    .within(() => {
                        cy.get('td').eq(1).should('not.be.empty'); 
                        cy.get('td').eq(2).should('not.be.empty'); 
                        cy.get('td').eq(3).should('not.be.empty'); 
                        cy.get('td').eq(4).should('not.be.empty'); 
                        cy.get('td').eq(5).should('not.be.empty'); 
                        cy.get('td').eq(6).should('not.be.empty'); 
                    });
            });
        });

        it("should be able to click the table for 2 weeks ago", () => {
            cy.get('#emp-dropdown-id')
                .find('option')
                .contains('john_doe@gmail.com')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });
    
            cy.get('#select-week-dropdown-id')
                .find('option')
                .contains('2 Weeks Ago')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });
        });

        it("should have non-empty payroll data for 2 Weeks Ago Advance, Additional, Deduction, and Total Weekly Pay", () => {
            cy.get('#emp-dropdown-id')
                .find('option')
                .contains('john_doe@gmail.com')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });
    
            cy.get('#select-week-dropdown-id')
                .find('option')
                .contains('2 Weeks Ago')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });

            cy.get('.empman-btm')
                .within(() => {
                    cy.get('p').contains('Additional').invoke('text').should('match', /₱\d+/);
                    cy.get('p').contains('Advance').invoke('text').should('match', /₱\d+/);
                    cy.get('p').contains('Deduction').invoke('text').should('match', /₱\d+/); 
                    cy.get('h1').contains('Total Weekly Pay').invoke('text').should('match', /₱\d+/); 
                });
        });

        daysOfWeek.forEach(day => {
            it(`should have non-empty payroll data for 2 weeks ago ${day}`, () => {
                cy.get('#emp-dropdown-id')
                .find('option')
                .contains('john_doe@gmail.com')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });
    
                cy.get('#select-week-dropdown-id')
                .find('option')
                .contains('2 Weeks Ago')
                .then(option => {
                    cy.wrap(option).parent().select(option.val());
                });

                cy.get('table#weekly-payroll-table-id')
                    .contains('tr', day)
                    .within(() => {
                        cy.get('td').eq(1).should('not.be.empty'); 
                        cy.get('td').eq(2).should('not.be.empty'); 
                        cy.get('td').eq(3).should('not.be.empty'); 
                        cy.get('td').eq(4).should('not.be.empty'); 
                        cy.get('td').eq(5).should('not.be.empty'); 
                        cy.get('td').eq(6).should('not.be.empty'); 
                    });
            });
        });

        it("should log-out", () => {
          cy.get(".admin-rightdash-bottom h2").click()
      
          cy.url().should("include", "http://localhost:3000")
      
        })
  })  
  
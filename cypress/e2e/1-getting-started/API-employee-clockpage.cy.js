/// <reference types="cypress" />


describe('Time-in API Test', () => {

    const weekdayIndex = new Date().getDay();


    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.get("#email").type("john_doe@gmail.com")
        cy.get("#password").type("123", { log: false })
        cy.get("#login-button").click()
      })

      it("should store the time-in value in the database", () => {

        cy.get("#time-in-btn").click()

        const current_time = new Date();
        let hours = current_time.getHours();
        let minutes = current_time.getMinutes();
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        const formattedTime = hours + ':' + minutes;

        if(weekdayIndex == 1) {
            cy.findOne({Email: "john_doe@gmail.com",Mon_Time_In:formattedTime});
        } else if (weekdayIndex == 2) {
            cy.findOne({Email: "john_doe@gmail.com",Tue_Time_In:formattedTime});
        } else if (weekdayIndex == 3) {
            cy.findOne({Email: "john_doe@gmail.com",Wed_Time_In:formattedTime});
        } else if (weekdayIndex == 4) {
            cy.findOne({Email: "john_doe@gmail.com",Thu_Time_In:formattedTime});
        } else if (weekdayIndex == 5) {
            cy.findOne({Email: "john_doe@gmail.com",Fri_Time_In:formattedTime});
        } else if (weekdayIndex == 6) {
            cy.findOne({Email: "john_doe@gmail.com",Sat_Time_In:formattedTime});
        } else if (weekdayIndex == 0) {
            cy.findOne({Email: "john_doe@gmail.com",Sun_Time_In:formattedTime});
        }

        cy.get("#popup-3 .close-btn").click()
      })


      it("should store the time-out value in the database", () => {

        cy.get("#time-out-btn").click()

        const current_time = new Date();
        let hours = current_time.getHours();
        let minutes = current_time.getMinutes();
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        const formattedTime = hours + ':' + minutes;

        if(weekdayIndex == 1) {
            cy.findOne({Email: "john_doe@gmail.com",Mon_Time_Out:formattedTime});
        } else if (weekdayIndex == 2) {
            cy.findOne({Email: "john_doe@gmail.com",Tue_Time_Out:formattedTime});
        } else if (weekdayIndex == 3) {
            cy.findOne({Email: "john_doe@gmail.com",Wed_Time_Out:formattedTime});
        } else if (weekdayIndex == 4) {
            cy.findOne({Email: "john_doe@gmail.com",Thu_Time_Out:formattedTime});
        } else if (weekdayIndex == 5) {
            cy.findOne({Email: "john_doe@gmail.com",Fri_Time_Out:formattedTime});
        } else if (weekdayIndex == 6) {
            cy.findOne({Email: "john_doe@gmail.com",Sat_Time_Out:formattedTime});
        } else if (weekdayIndex == 0) {
            cy.findOne({Email: "john_doe@gmail.com",Sun_Time_Out:formattedTime});
        }

        cy.get("#popup-4 .close-btn").click()
      })

  });
  
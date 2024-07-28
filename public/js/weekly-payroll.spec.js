import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Weekly Payroll Data Test', () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;

    global.fetch = vi.fn((url) => {
      if (url === "/admin_retrieve_employee_total_wp") {
        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve(`
            <div>
              <select id="emp-mgm-page-id"></select>
              <button id="Ti-To-logs-id"></button>
              <select id="emp-dropdown-id"></select>
              <input name="payroll-id" value="123">
              <button id="payroll-pph-changes-btn"></button>
              <button id="payroll-additional-changes-btn"></button>
              <button id="payroll-advance-changes-btn"></button>
              <button id="payroll-deduction-changes-btn"></button>
              <select id="emp-dropdown-week-id"></select>
              <form id="weekly-payroll-form-id"></form>
              <div id="select-week-dropdown-id" style="visibility:hidden;"></div>
            </div>
          `),
        });
      } else if (url.includes("/admin_retrieve_emp_wpay")) {
        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve("<div>Employee Payroll Data</div>"),
        });
      }
      return Promise.reject(new Error("Unexpected fetch call"));
    });

    document.body.innerHTML = '';
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("fetches initial data on DOMContentLoaded", async () => {
    document.addEventListener("DOMContentLoaded", function(){
      fetch("/admin_retrieve_employee_total_wp")
      .then(response =>{
          if (!response.ok){
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
      })
      .then(html =>{
          document.body.innerHTML = html; 
          document.getElementById("select-week-dropdown-id").style.visibility = "hidden";
          dropdown();
      })
      .catch(error =>{
          console.error('Error fetching /admin_retrieve_employee_total_wp:', error);
      });
    });

    document.dispatchEvent(new Event("DOMContentLoaded"));

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(document.body.innerHTML.includes("select-week-dropdown-id")).toBe(true);
    expect(document.getElementById("select-week-dropdown-id").style.visibility).toBe("hidden");
  });

  it("makes sure employee dropdown selection works", async () => {
    document.body.innerHTML = `
      <div>
        <select id="emp-dropdown-id">
          <option value="employee1">Employee 1</option>
        </select>
        <select id="emp-dropdown-week-id">
          <option value="">Select Week</option>
          <option value="current-week">Current Week</option>
          <option value="last-week">Last Week</option>
          <option value="2-weeks-ago">2 Weeks Ago</option>
        </select>
        <div id="select-week-dropdown-id" style="visibility:hidden;"></div>
        <div id="current-emp-option"></div>
        <div id="current-week-option"></div>
      </div>
    `;

    const empDropdown = document.getElementById("emp-dropdown-id");
    const weekDropdown = document.getElementById("emp-dropdown-week-id");

    empDropdown.addEventListener('change', function() {
      document.getElementById("select-week-dropdown-id").style.visibility = "visible";
      document.getElementById("current-week-option").innerHTML = "Select Week";
    });

    empDropdown.dispatchEvent(new Event("change"));

    expect(document.getElementById("select-week-dropdown-id").style.visibility).toBe("visible");

    weekDropdown.addEventListener('change', function() {
      const selected_emp = empDropdown.value;
      var selectedWeek2 = document.getElementById("emp-dropdown-week-id").selectedIndex - 1;
      let week_index = selectedWeek2;
      let curr_emp = selected_emp;
      let curr_week;

      if(selectedWeek2 === 0){
          curr_week = "Current Week";
      }else if(selectedWeek2 === 1){
          curr_week = "Last Week";
      }else{
          curr_week = "2 Weeks Ago";
      }

      fetch(`/admin_retrieve_emp_wpay?employee=${selected_emp}&week=${selectedWeek2}`)
      .then(response =>{
          if (!response.ok){
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
      })
      .then(html =>{
          document.body.innerHTML = html;
          document.getElementById("current-emp-option").innerHTML = curr_emp;
          document.getElementById("current-week-option").innerHTML = curr_week;
          dropdown();
      })
      .catch(error =>{
          console.error('Error fetching /admin_retrieve_emp_wpay:', error);
      });
    });

    weekDropdown.selectedIndex = 1;
    weekDropdown.dispatchEvent(new Event("change"));

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(document.body.innerHTML.includes("Employee Payroll Data")).toBe(true);
  });
});



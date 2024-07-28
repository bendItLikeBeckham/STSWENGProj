import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fireEvent, waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';

describe('editEmployeeForm', () => {
  let editForm, contactInput, passwordInput, addressInput, originalFetch;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="editEmployeeForm">
        <input type="text" id="Contact_Number" />
        <input type="password" id="Password" />
        <input type="text" id="Address" />
        <button type="submit">Submit</button>
      </form>
    `;

    editForm = document.getElementById("editEmployeeForm");
    contactInput = document.getElementById("Contact_Number");
    passwordInput = document.getElementById("Password");
    addressInput = document.getElementById("Address");

    originalFetch = global.fetch;
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve({ success: true })
    }));

    editForm.addEventListener("submit", function(event) {
      event.preventDefault();

      const contact_input = contactInput.value;
      const password_input = passwordInput.value;
      const address_input = addressInput.value;

      if (!contact_input || !password_input || !address_input) {
        alert("Please fill in all fields");
        return; 
      }

      const contactRegex = /^09\d{9}$/;
      if (!contactRegex.test(contact_input)) {
        alert("Invalid contact number format");
        return;
      }

      const formData = {
        Contact_Number: contact_input,
        Password: password_input,
        Address: address_input
      };

      fetch("/employee_update_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Employee updated successfully!");
        } else {
          alert("Error updating employee.");
        }
      })
      .catch(error => console.error("Error:", error));
    });
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('should alert if contact number format is invalid', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    contactInput.value = "1234567890";
    passwordInput.value = "password";
    addressInput.value = "address";

    fireEvent.submit(editForm);

    expect(alertSpy).toHaveBeenCalledWith("Invalid contact number format");
    alertSpy.mockRestore();
  });

  it('should alert if any field is empty', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    contactInput.value = "09123456789";
    passwordInput.value = "";
    addressInput.value = "address";

    fireEvent.submit(editForm);

    expect(alertSpy).toHaveBeenCalledWith("Please fill in all fields");
    alertSpy.mockRestore();
  });

  it('should make a fetch request with the correct data', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    contactInput.value = "09123456789";
    passwordInput.value = "password";
    addressInput.value = "address";

    await fireEvent.submit(editForm);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/employee_update_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Contact_Number: "09123456789",
          Password: "password",
          Address: "address"
        })
      });

      expect(alertSpy).toHaveBeenCalledWith("Employee updated successfully!");
    });

    alertSpy.mockRestore();
  });
});

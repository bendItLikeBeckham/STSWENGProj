import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';

async function login_function(event) {
  event.preventDefault();

  var email_input = document.getElementById("email").value;
  var password_input = document.getElementById("password").value;
  var error_message = document.getElementById("error_issue");

  try {
    const response = await fetch('/login_account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email_input,
        password: password_input,
      }),
    });
    const data = await response.json();

    if (data.success) {
      if (data.type === "Employee") {
        window.location.href = '/employee_clockpage';
      } else if (data.type === "Work From Home") {
        window.location.href = '/work_from_home_clockpage';
      } else {
        window.location.href = '/admin_dashboard';
      }
    } else {
      error_message.textContent = data.message;
    }
  } catch (error) {
    console.error(error);
    error_message.textContent = "Login Controller Error";
  }
}

describe('login_function', () => {
  let loginButton;
  let originalFetch;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="login-form">
        <input type="email" id="email" value="test@example.com"/>
        <input type="password" id="password" value="password123"/>
        <button id="login-button">Login</button>
        <div id="error_issue"></div>
      </form>
    `;

    loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', login_function);

    originalFetch = global.fetch;
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve({ success: true, type: "Employee" })
    }));
  });

  afterEach(() => {
    global.fetch = originalFetch;
    document.body.innerHTML = '';
  });

  it('should make a fetch request with the correct data when login button is clicked', async () => {
    await fireEvent.click(loginButton);

    expect(global.fetch).toHaveBeenCalledWith('/login_account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    });
  });

  it('should display an error message on login failure', async () => {
    global.fetch.mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve({ success: false, message: 'Invalid credentials' })
    }));

    await fireEvent.click(loginButton);

    await new Promise(setImmediate);

    const errorMessage = document.getElementById('error_issue');
    expect(errorMessage.textContent).toBe('Invalid credentials');
  });

  it('should navigate to the correct page on successful login', async () => {
    delete window.location;
    window.location = { href: '' };

    await fireEvent.click(loginButton);

    await new Promise(setImmediate);

    expect(window.location.href).toBe('/employee_clockpage');
  });

  it('should handle login controller error', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Network Error')));

    await fireEvent.click(loginButton);

    await new Promise(setImmediate);

    const errorMessage = document.getElementById('error_issue');
    expect(errorMessage.textContent).toBe('Login Controller Error');
  });
});

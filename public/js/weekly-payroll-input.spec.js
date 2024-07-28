import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

global.alert = vi.fn();
global.confirm = vi.fn();
global.document.getElementById = vi.fn(() => ({
  reset: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
  document.body.innerHTML = `
    <form id="weekly-payroll-form-id">
      <input id="pph-id" />
      <input id="add-id" />
      <input id="adv-id" />
      <input id="ded-id" />
    </form>
  `;
});

function validateInputPPH(input) {
  if (isNaN(parseFloat(input)) || parseFloat(input) < 1 || input.includes('/') || input.includes('-') || input === '.') {
    alert("Please enter a valid non-negative integer.");
    document.getElementById("weekly-payroll-form-id").reset();
  } else {
    showConfirmMessage();
  }
}

function validateInput(input) {
  if (isNaN(parseFloat(input)) || parseFloat(input) < 0 || input.includes('/') || input.includes('-') || input === '.') {
    alert("Please enter a valid non-negative integer.");
    document.getElementById("weekly-payroll-form-id").reset();
  } else {
    showConfirmMessage();
  }
}

function showConfirmMessage() {
  var confirmation = confirm("Are you sure you want to confirm the new value for this week?");
  if (confirmation) {
    alert("CONFIRMED!");
    update_payroll();
  } else {
    document.getElementById("weekly-payroll-form-id").reset();
  }
}

async function update_payroll() {
  // Simulated update function
}

describe('Input Validation Tests', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('validateInputPPH', () => {
    it('should alert for NaN input', () => {
      validateInputPPH('abc');
      expect(alert).toHaveBeenCalledWith('Please enter a valid non-negative integer.');
    });

    it('should alert for input less than 1', () => {
      validateInputPPH('0.5');
      expect(alert).toHaveBeenCalledWith('Please enter a valid non-negative integer.');
    });

    it('should alert for input containing /', () => {
      validateInputPPH('1/2');
      expect(alert).toHaveBeenCalledWith('Please enter a valid non-negative integer.');
    });

    it('should alert for input containing -', () => {
      validateInputPPH('1-2');
      expect(alert).toHaveBeenCalledWith('Please enter a valid non-negative integer.');
    });

    it('should alert for . input', () => {
      validateInputPPH('.');
      expect(alert).toHaveBeenCalledWith('Please enter a valid non-negative integer.');
    });
  });

  describe('validateInput', () => {
    it('should alert for NaN input', () => {
      validateInput('abc');
      expect(alert).toHaveBeenCalledWith('Please enter a valid non-negative integer.');
    });

    it('should alert for negative input', () => {
      validateInput('-1');
      expect(alert).toHaveBeenCalledWith('Please enter a valid non-negative integer.');
    });

    it('should alert for input containing /', () => {
      validateInput('1/2');
      expect(alert).toHaveBeenCalledWith('Please enter a valid non-negative integer.');
    });

    it('should alert for input containing -', () => {
      validateInput('1-2');
      expect(alert).toHaveBeenCalledWith('Please enter a valid non-negative integer.');
    });

    it('should alert for . input', () => {
      validateInput('.');
      expect(alert).toHaveBeenCalledWith('Please enter a valid non-negative integer.');
    });

    
  });
});

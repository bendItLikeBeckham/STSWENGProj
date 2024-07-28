import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockFetch = vi.fn();
const mockConsoleError = vi.fn();

const selectWeek = () => {
  const selectElement = document.getElementById('emp-dropdown-week-id');
  const selectedIndex = selectElement ? selectElement.selectedIndex : -1;
  if (selectedIndex === -1) return;
  
  const week = selectedIndex;
  fetch('/retrieve_employee_payroll', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ week }),
  })
  .then(response => response.text())
  .then(html => {
    document.body.innerHTML = html;
  })
  .catch(error => {
    console.error('Error fetching /retrieve_employee_payroll', error);
  });
};

const fetchEmployeeDashboard = () => {
  fetch('/employee_dashboard')
    .then(response => response.text())
    .then(html => {
      document.body.innerHTML = html;
    })
    .catch(error => {
      console.error('Error fetching /employee_dashboard:', error);
    });
};

const triggerDOMContentLoaded = () => {
  document.dispatchEvent(new Event('DOMContentLoaded'));
};

document.addEventListener('DOMContentLoaded', fetchEmployeeDashboard);

global.fetch = mockFetch;
global.console.error = mockConsoleError;

describe('Employee Dashboard Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('should fetch employee dashboard on DOMContentLoaded', async () => {
    const mockResponse = {
      ok: true,
      text: vi.fn().mockResolvedValue('<div>Dashboard Content</div>'),
    };

    mockFetch.mockResolvedValueOnce(mockResponse);

    triggerDOMContentLoaded();

    await new Promise(process.nextTick);

    expect(mockFetch).toHaveBeenCalledWith('/employee_dashboard');
    expect(mockResponse.text).toHaveBeenCalled();
    expect(document.body.innerHTML).toBe('<div>Dashboard Content</div>');
  });

  it('should log an error if fetch fails on DOMContentLoaded', async () => {
    const mockError = new Error('Fetch failed');
    mockFetch.mockRejectedValueOnce(mockError);

    triggerDOMContentLoaded();

    await new Promise(process.nextTick);

    expect(mockFetch).toHaveBeenCalledWith('/employee_dashboard');
    expect(mockConsoleError).toHaveBeenCalledWith('Error fetching /employee_dashboard:', mockError);
  });

  it('should fetch selected week data on selectWeek', async () => {
    const mockResponse = {
      ok: true,
      text: vi.fn().mockResolvedValue('<div>Week Content</div>'),
    };

    mockFetch.mockResolvedValueOnce(mockResponse);

    document.body.innerHTML = '<select id="emp-dropdown-week-id"><option>Week 1</option><option>Week 2</option></select>';
    document.getElementById('emp-dropdown-week-id').selectedIndex = 1;

    selectWeek();

    await new Promise(process.nextTick);

    expect(mockFetch).toHaveBeenCalledWith('/retrieve_employee_payroll', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ week: 1 }),
    });
    expect(mockResponse.text).toHaveBeenCalled();
    expect(document.body.innerHTML).toBe('<div>Week Content</div>');
  });

  it('should log an error if fetch fails in selectWeek', async () => {
    const mockError = new Error('Fetch failed');
    mockFetch.mockRejectedValueOnce(mockError);

    document.body.innerHTML = '<select id="emp-dropdown-week-id"><option>Week 1</option><option>Week 2</option></select>';
    document.getElementById('emp-dropdown-week-id').selectedIndex = 1;

    selectWeek();

    await new Promise(process.nextTick);

    expect(mockFetch).toHaveBeenCalledWith('/retrieve_employee_payroll', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ week: 1 }),
    });
    expect(mockConsoleError).toHaveBeenCalledWith('Error fetching /retrieve_employee_payroll', mockError);
  });
});

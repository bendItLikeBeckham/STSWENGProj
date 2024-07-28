import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';

import './time_retrieval.js'; 

describe('time_out_function', () => {
  let timeOutButton;
  let originalFetch;

  beforeEach(() => {
    document.body.innerHTML = `
      <button id="time-out-btn">Time Out</button>
    `;

    timeOutButton = document.getElementById('time-out-btn');

    originalFetch = global.fetch;
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve({})
    }));

    // Manually trigger the DOMContentLoaded event to attach event listeners
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  afterEach(() => {
    global.fetch = originalFetch;
    document.body.innerHTML = '';
  });

  it('should make a fetch request with the correct data when time-out button is clicked', async () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes() < 10 ? `0${currentTime.getMinutes()}` : currentTime.getMinutes();
    const weekdayIndex = currentTime.getDay();

    await fireEvent.click(timeOutButton);

    console.log(global.fetch.mock.calls);

    expect(global.fetch).toHaveBeenCalledWith('/employee_time_out', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        TO_hour: hours,
        TO_minute: minutes,
        TO_weekdayIndex: weekdayIndex
      }),
    });
  });
});

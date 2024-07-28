import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockFetch = vi.fn();
const mockConsoleError = vi.fn();

global.fetch = mockFetch;
global.console.error = mockConsoleError;

document.addEventListener("DOMContentLoaded", function () {
    current_date_logs();

    var input_date = document.getElementById("get-date-id");
    input_date.addEventListener('change', get_date);

    var emp_mgm_button = document.getElementById("emp-mgm-id");
    emp_mgm_button.addEventListener('click', emp_mgm_redirect_0);

    async function emp_mgm_redirect_0(event) {
        event.preventDefault();
        window.location.href = '/admin_empman_attendrecs';
    }

    async function current_date_logs() {
        try {
            var today = new Date();
            var day = String(today.getDate()).padStart(2, '0');
            var month = String(today.getMonth() + 1).padStart(2, '0');
            var year = today.getFullYear();
            var current_date = year + '-' + month + '-' + day;

            var day2 = new Date(current_date);
            var day_of_the_week = day2.getDay();
            var day_names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var day_name = day_names[day_of_the_week];

            const response = await fetch(`/retrieve_employee_summary?s_date=${current_date}&d_week=${day_name}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const html = await response.text();
            document.body.innerHTML = html;
            sidebar_buttons();
        } catch (error) {
            console.error('Error fetching /retrieve_employee_summary:', error);
        }
    }
});

function get_date() {
    var input_date = document.getElementById("get-date-id");
    var selected_date = input_date.value;

    var day = new Date(selected_date);
    var day_of_the_week = day.getDay();
    var day_names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day_name = day_names[day_of_the_week];

    fetch(`/retrieve_employee_summary?s_date=${selected_date}&d_week=${day_name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            document.body.innerHTML = html;
            sidebar_buttons();
        })
        .catch(error => {
            console.error('Error fetching /retrieve_employee_summary:', error);
        });
}

function sidebar_buttons() {
    var emp_mgm_button = document.getElementById("emp-mgm-id");
    emp_mgm_button.addEventListener('click', emp_mgm_redirect);

    var input_date = document.getElementById("get-date-id");
    input_date.addEventListener('change', get_date);

    async function emp_mgm_redirect(event) {
        event.preventDefault();
        window.location.href = '/admin_empman_emprecs';
    }
}

const triggerDOMContentLoaded = () => {
    document.dispatchEvent(new Event('DOMContentLoaded'));
};

describe('Admin Time-In/Out Logs Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = `
            <input type="date" id="get-date-id">
            <button id="emp-mgm-id"></button>
        `;
    });

    it('should fetch current date logs on DOMContentLoaded', async () => {
        const mockResponse = {
            ok: true,
            text: vi.fn().mockResolvedValue('<div>Log Content</div>'),
        };

        mockFetch.mockResolvedValueOnce(mockResponse);

        triggerDOMContentLoaded();

        await new Promise(process.nextTick);

        expect(mockFetch).toHaveBeenCalled();
        expect(mockResponse.text).toHaveBeenCalled();
        expect(document.body.innerHTML).toContain('<div>Log Content</div>');
    });

    it('should log an error if fetch fails on current date logs', async () => {
        const mockError = new Error('Fetch failed');
        mockFetch.mockRejectedValueOnce(mockError);

        triggerDOMContentLoaded();

        await new Promise(process.nextTick);

        expect(mockFetch).toHaveBeenCalled();
        expect(mockConsoleError).toHaveBeenCalledWith('Error fetching /retrieve_employee_summary:', mockError);
    });

    it('should redirect to employee management page on button click', () => {
        const mockLocation = { href: '' };
        delete window.location;
        window.location = mockLocation;

        triggerDOMContentLoaded();

        const emp_mgm_button = document.getElementById('emp-mgm-id');
        emp_mgm_button.click();

        expect(window.location.href).toBe('/admin_empman_attendrecs');
    });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockFetch = vi.fn();
global.fetch = mockFetch;

const triggerDOMContentLoaded = () => {
    document.dispatchEvent(new Event('DOMContentLoaded'));
};

document.addEventListener("DOMContentLoaded", function() {
    const editForm = document.getElementById("editEmployeeForm");

    editForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const formData = {
            Email: document.getElementById("Email").textContent,
            Password: document.getElementById("Password").value        
        };

        console.log(formData);

        fetch("/employee_update_user_verify", {
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

describe('Email Change Password', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = `
            <form id="editEmployeeForm">
                <span id="Email">test@example.com</span>
                <input type="password" id="Password" value="password123">
                <button type="submit">Submit</button>
            </form>
        `;
    });

    it('should submit the form and call fetch with correct parameters', async () => {
        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue({ success: true })
        };

        mockFetch.mockResolvedValueOnce(mockResponse);

        triggerDOMContentLoaded();

        const form = document.getElementById('editEmployeeForm');
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

        await new Promise(process.nextTick);

        expect(mockFetch).toHaveBeenCalledWith("/employee_update_user_verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ Email: "test@example.com", Password: "password123" })
        });
    });

    it('should show an alert on successful update', async () => {
        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue({ success: true })
        };

        mockFetch.mockResolvedValueOnce(mockResponse);
        global.alert = vi.fn();

        triggerDOMContentLoaded();

        const form = document.getElementById('editEmployeeForm');
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

        await new Promise(process.nextTick);

        expect(global.alert).toHaveBeenCalledWith("Employee updated successfully!");
    });

    it('should show an alert on error update', async () => {
        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue({ success: false })
        };

        mockFetch.mockResolvedValueOnce(mockResponse);
        global.alert = vi.fn();

        triggerDOMContentLoaded();

        const form = document.getElementById('editEmployeeForm');
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

        await new Promise(process.nextTick);

        expect(global.alert).toHaveBeenCalledWith("Error updating employee.");
    });

    it('should log an error if fetch fails', async () => {
        const mockError = new Error('Fetch failed');
        mockFetch.mockRejectedValueOnce(mockError);
        global.console.error = vi.fn();

        triggerDOMContentLoaded();

        const form = document.getElementById('editEmployeeForm');
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

        await new Promise(process.nextTick);

        expect(global.console.error).toHaveBeenCalledWith("Error:", mockError);
    });
});

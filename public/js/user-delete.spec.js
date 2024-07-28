import { vitest } from "vitest";
import { test } from "vitest";

async function delete_function() {
    var email_input = document.getElementById("emailToDelete").textContent;

    try {
        const response = await fetch("/delete_chosen_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email_input,
            }),
        });
        const data = await response.json();
        if (data.success) {
            togglePopup();
            console.log("Data Sent");
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.error(error);
    }
}

function displayDetail() {
    var selectedEmployee = document.getElementById("email").value;

    return fetch("/display_delete_info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: selectedEmployee }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then((html) => {
            document.body.innerHTML = html;
        })
        .catch((error) => {
            console.error("Error fetching /display_delete_info", error);
        });
}

function togglePopup() {
    document.getElementById("popup-2").classList.toggle("active");
}

function togglePopup2() {
    document.getElementById("popup-3").classList.toggle("active");
}

function reload() {
    location.reload();
}

// Mocking fetch for testing purposes
window.fetch = async (url, options) => {
    // Define your mock behavior based on the URL and options
    if (url === "/display_delete_info" && options.method === "POST") {
        const requestBody = JSON.parse(options.body);
        if (requestBody.email === "john.doe@example.com") {
            return {
                ok: true,
                text: () => Promise.resolve('<div>Employee details displayed</div>'),
            };
        }
    } else if (url === "/delete_chosen_user" && options.method === "POST") {
        const requestBody = JSON.parse(options.body);
        if (requestBody.email === "nonexistent.user@example.com") {
            return {
                ok: true,
                json: () => Promise.resolve({ success: false, message: "User not found" }),
            };
        }
    }
    throw new Error("Unexpected fetch call");
};

test("Delete function Functionality Works", async () => {
    document.body.innerHTML = `
        <div id="emailToDelete" data-email="john.doe@example.com">john.doe@example.com</div>
        <div id="popup-2"></div>
    `;

    window.fetch = async (url, options) => {
        if (url === "/delete_chosen_user" && options.method === "POST") {
            const requestBody = JSON.parse(options.body);
            if (requestBody.email === "john.doe@example.com") {
                return {
                    ok: true,
                    json: () => Promise.resolve({ success: true }),
                };
            }
        }
        throw new Error("Unexpected fetch call");
    };

    await delete_function();

    const popup2 = document.getElementById("popup-2");
    const popupIsActive = popup2.classList.contains("active");

    assert(popupIsActive, "Popup should be active after successful deletion");
});

test("Delete function handles non-existent user", async () => {
    document.body.innerHTML = `
        <div id="emailToDelete" data-email="nonexistent.user@example.com">nonexistent.user@example.com</div>
        <div id="popup-2"></div>
    `;

    await delete_function();

    const popup2 = document.getElementById("popup-2");
    const popupIsActive = popup2.classList.contains("active");

    assert(!popupIsActive, "Popup should not be active for non-existent user");
});

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}


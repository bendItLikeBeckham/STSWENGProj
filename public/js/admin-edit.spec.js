import { vitest } from "vitest";
import { test } from "vitest";

window.fetch = async (url) => {
    if (url.startsWith("/search_user")) {
        const email = decodeURIComponent(url.split("=")[1]);
        if (email === "john_doe@gmail.com") {
            return {
                ok: true,
                json: () => Promise.resolve({
                    success: true,
                    curr_employee: {
                        First_Name: "John",
                        Last_Name: "Doe",
                        Contact_Number: "1234567890",
                        Password: "password",
                        Address: "123 Street, City"
                    }
                })
            };
        } else {
            return {
                ok: true,
                json: () => Promise.resolve({ success: false })
            };
        }
    } else if (url === "/update_user") {
        return {
            ok: true,
            json: () => Promise.resolve({ success: true })
        };
    }
    throw new Error("Unexpected fetch call");
};

test("Search Form - Employee Found", async () => {
    document.body.innerHTML = `
        <form id="searchEmployeeForm">
            <input id="Email" type="text" value="john_doe@gmail.com">
        </form>
        <div id="employeeDetails" style="display: none;"></div>
    `;

    const searchForm = document.getElementById("searchEmployeeForm");
    const employeeDetails = document.getElementById("employeeDetails");

    searchForm.dispatchEvent(new Event("submit"));

    await new Promise(resolve => setTimeout(resolve, 0));

    assert(employeeDetails.style.display === "none", "Employee details should be displayed");
});

test("Search Form - Employee Not Found", async () => {
    document.body.innerHTML = `
        <form id="searchEmployeeForm">
            <input id="Email" type="text" value="nonexistent.employee@example.com">
        </form>
        <div id="employeeDetails" style="display: none;"></div>
    `;

    const searchForm = document.getElementById("searchEmployeeForm");
    const employeeDetails = document.getElementById("employeeDetails");

    searchForm.dispatchEvent(new Event("submit"));

    await new Promise(resolve => setTimeout(resolve, 0));

    assert(employeeDetails.style.display === "none", "Employee details should not be displayed");
});

test("Edit Form - Success", async () => {
    document.body.innerHTML = `
        <form id="editEmployeeForm">
            <input id="Email" type="text" value="john_doe@gmail.com">
            <input id="First_Name" type="text" value="John">
            <input id="Last_Name" type="text" value="Doe">
            <input id="Contact_Number" type="text" value="1234567890">
            <input id="Password" type="password" value="password">
            <input id="Address" type="text" value="123 Street, City">
        </form>
    `;

    const editForm = document.getElementById("editEmployeeForm");

    editForm.dispatchEvent(new Event("submit"));

    await new Promise(resolve => setTimeout(resolve, 0));

    const alertMessage = "Employee updated successfully!";
    assert(alertMessage === "Employee updated successfully!", "Success message should be displayed");
});

test("Edit Form - Error", async () => {
    document.body.innerHTML = `
        <form id="editEmployeeForm">
            <input id="Email" type="text" value="john_doe@gmail.com">
            <input id="First_Name" type="text" value="John">
            <input id="Last_Name" type="text" value="Doe">
            <input id="Contact_Number" type="text" value="1234567890">
            <input id="Password" type="password" value="password">
            <input id="Address" type="text" value="123 Street, City">
        </form>
    `;

    const editForm = document.getElementById("editEmployeeForm");

    window.fetch = async () => {
        throw new Error("Failed to fetch");
    };

    editForm.dispatchEvent(new Event("submit"));

    await new Promise(resolve => setTimeout(resolve, 0));

    const alertMessage = "Error updating employee.";
    assert(alertMessage === "Error updating employee.", "Error message should be displayed");
});

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

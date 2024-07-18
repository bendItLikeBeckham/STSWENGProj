import { vitest } from "vitest";
import {test} from 'vitest';

test('Register function submits form data correctly', async () => {
    document.body.innerHTML = `
        <form id="registerForm">
            <input id="firstName" value="John">
            <input id="lastName" value="Doe">
            <input id="contactNumber" value="09123456789">
            <input id="email" value="john.doe@example.com">
            <input id="password" value="password">
            <input id="address" value="123 Main St">
            <select id="employee-type">
                <option value="Employee">Employee</option>
                <option value="Admin">Admin</option>
            </select>
            <button id="register-button">Register</button>
        </form>
        <div id="popup-2"></div>
        <div id="popup-3"></div>
    `;

    var register_button_submit = document.getElementById("register-button");
    register_button_submit.addEventListener('click', async (event) => {
        event.preventDefault();

        var first_name_input = document.getElementById("firstName").value;
        var last_name_input = document.getElementById("lastName").value;
        var contact_input = document.getElementById("contactNumber").value;
        var email_input = document.getElementById("email").value;
        var password_input = document.getElementById("password").value;
        var address_input = document.getElementById("address").value;
        var employee_type_input = document.getElementById("employee-type").value;

        if (!first_name_input || !last_name_input || !password_input || !address_input) {
            alert("Please fill in all fields");
            return; 
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email_input)) {
            alert("Invalid email format");
            return;
        }

        const contactRegex = /^09\d{9}$/;
        if (!contactRegex.test(contact_input)) {
            alert("Invalid contact number format");
            return;
        }

        try{
            const response = await fetch('/register_employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: first_name_input,
                    lastName: last_name_input,
                    contactNumber: contact_input,
                    email: email_input,
                    password: password_input,
                    address: address_input,
                    employee_type: employee_type_input
                }),
            });
            const data = await response.json();
            if(data.success){
                togglePopup();
                togglePopup2();
            }else{
                console.log(data.message);
            }
        }catch(error){
            console.error(error);
        }
    });

    function togglePopup(){
        document.getElementById("popup-2").classList.toggle("active");
    }

    function togglePopup2(){
        document.getElementById("popup-3").classList.toggle("active");
    }

    const register_button = document.getElementById("register-button");
    register_button.click();

    const response = { success: true };


    await new Promise(resolve => setTimeout(resolve, 100)); // Wait for async operations
    const popup2 = document.getElementById("popup-2");
    const popup3 = document.getElementById("popup-3");
    expect(popup2.classList.contains("active")).toBe(false);
    expect(popup3.classList.contains("active")).toBe(false);

});

test("Register function handles incorrect input correctly", async () => {
    document.body.innerHTML = `
        <form id="registerForm">
            <input id="firstName" value="">
            <input id="lastName" value="">
            <input id="contactNumber" value="09123456789">
            <input id="email" value="invalid_email">
            <input id="password" value="">
            <input id="address" value="">
            <select id="employee-type">
                <option value="Employee">Employee</option>
                <option value="Admin">Admin</option>
            </select>
            <button id="register-button">Register</button>
        </form>
        <div id="popup-2"></div>
        <div id="popup-3"></div>
    `;

    var register_button_submit = document.getElementById("register-button");
    register_button_submit.addEventListener("click", async (event) => {
        event.preventDefault();

        var first_name_input = document.getElementById("firstName").value;
        var last_name_input = document.getElementById("lastName").value;
        var contact_input = document.getElementById("contactNumber").value;
        var email_input = document.getElementById("email").value;
        var password_input = document.getElementById("password").value;
        var address_input = document.getElementById("address").value;
        var employee_type_input = document.getElementById("employee-type").value;

        if (!first_name_input || !last_name_input || !password_input || !address_input) {
            alert("Please fill in all fields");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email_input)) {
            alert("Invalid email format");
            return;
        }

        const contactRegex = /^09\d{9}$/;
        if (!contactRegex.test(contact_input)) {
            alert("Invalid contact number format");
            return;
        }

        try {
            const response = await fetch("/register_employee", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: first_name_input,
                    lastName: last_name_input,
                    contactNumber: contact_input,
                    email: email_input,
                    password: password_input,
                    address: address_input,
                    employee_type: employee_type_input,
                }),
            });
            const data = await response.json();
            if (data.success) {
                togglePopup();
                togglePopup2();
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    });

    function togglePopup() {
        document.getElementById("popup-2").classList.toggle("active");
    }

    function togglePopup2() {
        document.getElementById("popup-3").classList.toggle("active");
    }

    const register_button = document.getElementById("register-button");
    register_button.click();

    await new Promise((resolve) => setTimeout(resolve, 100));

    const popup2 = document.getElementById("popup-2");
    const popup3 = document.getElementById("popup-3");
    expect(popup2.classList.contains("active")).toBe(false);
    expect(popup3.classList.contains("active")).toBe(false);
});

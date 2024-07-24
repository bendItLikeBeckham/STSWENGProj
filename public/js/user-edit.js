document.addEventListener("DOMContentLoaded", function() {
    const editForm = document.getElementById("editEmployeeForm");

    editForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const contact_input = document.getElementById("Contact_Number").value
        const password_input = document.getElementById("Password").value
        const address_input = document.getElementById("Address").value

        const contactRegex =/^09\d{9}$/
        if (!contactRegex.test(contact_input)) {
            alert("Invalid contact number format");
            return;
        }

        if (!contact_input || !password_input || !address_input) {
            alert("Please fill in all fields");
            return; 
        }        

        const formData = {
            Contact_Number: contact_input,
            Password: password_input,
            Address: address_input
        };


        console.log(formData)

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
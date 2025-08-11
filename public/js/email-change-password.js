document.addEventListener("DOMContentLoaded", function() {
    const editForm = document.getElementById("editEmployeeForm");

    editForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        password_input = document.getElementById("Password").value ;
        
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;
        if (!passwordRegex.test(password_input)) {
            alert("Password must contain at least one uppercase letter, one number, and one special character.");
            return;
        }

        const formData = {
            Email: document.getElementById("Email").textContent,
            Password: password_input       
        };

        console.log(formData)

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
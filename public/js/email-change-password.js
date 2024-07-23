document.addEventListener("DOMContentLoaded", function() {
    const editForm = document.getElementById("editEmployeeForm");

    editForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const formData = {
            Email: document.getElementById("Email").textContent,
            Password: document.getElementById("Password").value        
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
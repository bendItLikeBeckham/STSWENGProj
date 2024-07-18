document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById("searchEmployeeForm");
    const editForm = document.getElementById("editEmployeeForm");
    const employeeDetails = document.getElementById("employeeDetails");

    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const email = document.getElementById("Email").value;
        
        fetch(`/search_user?email=${encodeURIComponent(email)}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById("First_Name").value = data.curr_employee.First_Name;
                    document.getElementById("Last_Name").value = data.curr_employee.Last_Name;
                    document.getElementById("Contact_Number").value = data.curr_employee.Contact_Number;
                    document.getElementById("Password").value = data.curr_employee.Password;
                    document.getElementById("Address").value = data.curr_employee.Address;
                    employeeDetails.style.display = "block";
                } else {
                    alert("Employee not found.");
                    employeeDetails.style.display = "none";
                }
            })
            .catch(error => console.error("Error:", error));
    });

    editForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const formData = {
            Email: document.getElementById("Email").value,
            First_Name: document.getElementById("First_Name").value,
            Last_Name: document.getElementById("Last_Name").value,
            Contact_Number: document.getElementById("Contact_Number").value,
            Password: document.getElementById("Password").value,
            Address: document.getElementById("Address").value
        };

        console.log(formData)

        fetch("/update_user", {
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
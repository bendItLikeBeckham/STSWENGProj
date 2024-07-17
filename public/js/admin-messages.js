document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('notificationForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent the default form submission
            const message = document.getElementById('message').value;
            const response = await fetch('/add_message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            if (response.ok) {
                window.location.reload();
            }
        });
    }

    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const id = button.getAttribute('data-id');
            console.log(id)
            const response = await fetch(`/delete_message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id })
            });
            
            if (response.ok) {
                window.location.reload();
            }
        });
    });
});
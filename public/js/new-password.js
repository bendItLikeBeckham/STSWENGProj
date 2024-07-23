document.getElementById('emailForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = e.target.email.value;

    fetch('/send_email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.text())
    .then(message => {
        document.getElementById('message').textContent = message;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
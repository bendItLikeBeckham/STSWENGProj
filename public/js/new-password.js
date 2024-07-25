document.getElementById('emailForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var hostname = window.location.host
    console.log(hostname)
    
    const email = e.target.email.value;

    fetch('/send_email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, hostname })
    })
    .then(response => response.text())
    .then(message => {
        document.getElementById('message').textContent = message;
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
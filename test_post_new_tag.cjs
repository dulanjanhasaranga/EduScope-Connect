const http = require('http');

async function test() {
    try {
        const loginRes = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email: 'dulanjan.connect@gmail.com', password: 'Password123!' })
        });
        const loginData = await loginRes.json();
        const token = loginData.token;
        
        const res = await fetch('http://localhost:8080/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                title: 'Test Question 2',
                body: 'This is a test body with a completely new tag',
                tags: ['brandnewtag123']
            })
        });
        
        const data = await res.text();
        console.log("STATUS:", res.status);
        console.log("RESPONSE:", data);
    } catch(err) {
        console.error(err);
    }
}
test();

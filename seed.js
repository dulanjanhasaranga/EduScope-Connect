const http = require('http');

const API_BASE = 'http://localhost:8080/api';

const users = [
    { username: 'alice2028', email: 'alice2028@example.com', password: 'Password123!', name: 'Alice Smith' },
    { username: 'bob2028', email: 'bob2028@example.com', password: 'Password123!', name: 'Bob Jones' },
    { username: 'charlie2028', email: 'charlie2028@example.com', password: 'Password123!', name: 'Charlie Brown' }
];

const tags = ['react', 'java', 'spring-boot', 'javascript', 'docker', 'machine-learning'];

async function request(method, path, body = null, token = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(API_BASE + path);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }
        
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(data ? JSON.parse(data) : {});
                    } catch (e) {
                        resolve(data);
                    }
                } else {
                    reject(`Request failed with status ${res.statusCode}: ${data}`);
                }
            });
        });
        
        req.on('error', reject);
        
        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function seed() {
    console.log("Seeding data...");
    
    // 1. Register and Login users
    const tokens = {};
    for (const u of users) {
        try {
            const registerRes = await request('POST', '/auth/register', {
                username: u.username,
                email: u.email,
                password: u.password,
                confirmPassword: u.password
            });
            if (registerRes.error) {
                 console.log(`Failed to register ${u.username}: `, registerRes);
            } else {
                 console.log(`Registered ${u.username}`);
            }
        } catch(e) {
            console.log(`User ${u.username} registration failed: `, e);
        }
        
        const loginRes = await request('POST', '/auth/login', {
            email: u.email,
            password: u.password
        });
        console.log(`Login response for ${u.username}:`, typeof loginRes, loginRes);
        tokens[u.username] = loginRes.token;
        console.log(`Logged in ${u.username}`);
    }
    
    // 2. Ask Questions
    console.log("Creating questions...");
    const q1 = await request('POST', '/questions', {
        title: 'How do I use useEffect correctly in React 18?',
        body: 'I keep getting infinite loops when I put objects in my dependency array. What is the correct way to memoize them or use them in `useEffect`?',
        tags: ['react']
    }, tokens['alice2028']);
    
    const q2 = await request('POST', '/questions', {
        title: 'What is the best way to handle Authentication in Spring Boot 3?',
        body: 'Im migrating from Spring Boot 2 to 3. Should I still use WebSecurityConfigurerAdapter or is there a newer component-based approach?',
        tags: ['java']
    }, tokens['bob2028']);

    const q3 = await request('POST', '/questions', {
        title: 'Docker container cannot connect to localhost database',
        body: 'My Node app is in a docker container but it throws ECONNREFUSED when trying to connect to my local MySQL database. Help!',
        tags: ['docker']
    }, tokens['charlie2028']);
    
    // 3. Post Answers
    console.log("Creating answers...");
    await request('POST', `/questions/${q1.id}/answers`, {
        body: 'You should use `useMemo` to memoize the object before passing it to the dependency array. Alternatively, if the object is static, declare it outside the component!'
    }, tokens['bob2028']);
    
    await request('POST', `/questions/${q2.id}/answers`, {
        body: '`WebSecurityConfigurerAdapter` is deprecated in Spring Security 6 (Spring Boot 3). You should now register a `SecurityFilterChain` bean instead.'
    }, tokens['alice2028']);
    
    await request('POST', `/questions/${q3.id}/answers`, {
        body: 'Inside a Docker container, `localhost` refers to the container itself. To connect to your host machine, use `host.docker.internal` instead of localhost.'
    }, tokens['alice2028']);

    // 4. Upvote questions and answers
    console.log("Adding votes...");
    await request('POST', `/questions/${q1.id}/vote?type=UPVOTE`, null, tokens['charlie2028']);
    await request('POST', `/questions/${q1.id}/vote?type=UPVOTE`, null, tokens['bob2028']);
    await request('POST', `/questions/${q2.id}/vote?type=UPVOTE`, null, tokens['charlie2028']);
    
    console.log("Seeding complete!");
}

seed().catch(console.error);

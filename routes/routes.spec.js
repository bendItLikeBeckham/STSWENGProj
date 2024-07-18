import {test} from 'vitest';
import request from 'supertest';
import app from '../index.js';


test('GET / should return status 200', async () => {
    await request(app)
        .get('/')
        .expect(200);
});

test('POST /login_account should return status 200 when not logged in and inputted correct credentials', async () => {
    await request(app)
        .post('/login_account')
        .send({ email: 'john_doe@gmail.com', password: '123' })
        .expect(200);
});

test('GET /employee_dashboard should redirect to log in page when not logged in', async () => {
    await request(app)
        .get('/employee_dashboard')
        .expect(302) 
        .expect('Location', '/'); 
});

test('GET /admin_dashboard should redirect when not logged in', async () => {
    await request(app)
        .get('/admin_dashboard')
        .expect(302)
        .expect('Location', '/'); 
});

test('GET /employee_clockpage should redirect when not logged in', async () => {
    await request(app)
        .get('/employee_clockpage')
        .expect(302)
        .expect('Location', '/'); 
});

test('GET /admin_dashboard should redirect to employee clock page when logged in as employee', async () => {
    const agent = request.agent(app);
    await agent
        .post('/login_account')
        .send({ email: 'john_doe@gmail.com', password: '123' });

    await agent
        .get('/admin_dashboard')
        .expect(302)
        .expect('Location', '/employee_clockpage');
});

test('GET /employee_clockpage should redirect to admin dashboard when logged in as admin', async () => {
    const agent = request.agent(app);
    await agent
        .post('/login_account')
        .send({ email: 'adminusertest111@gmail.com', password: '123' });

    await agent
        .get('/employee_clockpage')
        .expect(302)
        .expect('Location', '/admin_dashboard');
});



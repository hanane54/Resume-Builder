import React, { useState } from 'react';
import {login} from '../api/auth'

const Login = () => {
    const [credentials, setCredentials] = useState( { email: '', password: ''} );

    const handleSubmit = async (e) => {
        // to prevent browser reload/refresh
        e.preventDefault();
        try{
            const response = await login(credentials);
            console.log('Login is done successfully :', response);
        } catch (err){
            console.error('Login failed:', err);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={credentials.email}
            onChange={ (e) => setCredentials( { ...credentials, email: e.target.value } ) } />
            <input type="password" placeholder="Password" value={credentials.password}
            onChange={ (e) => setCredentials( { ...credentials, password: e.target.value } ) } />
            <button type="submit"> Login </button>
        </form>
    )
}

export default Login;
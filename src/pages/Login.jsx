import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
  
    const [loginUser] = useMutation(LOGIN_USER, {
      onCompleted: (data) => {
        localStorage.setItem('token', data.loginUser.token);
        localStorage.setItem('userId', data.loginUser.id); 
        const role = data.loginUser.role;
        window.location.href = role === 'nurse' ? '/nurse' : '/patient'; 
      },
      onError: (error) => {
        console.error('Error logging in:', error);
      },
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      loginUser({ variables: formData });
    };
  
    return (
      <div>
        <div>Login Page</div>
        <div>
          <form id="loginForm" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email address</label>
              <input type="email" placeholder="Enter email" name="email" id="email" value={formData.email} onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Password" name="password" id="password" value={formData.password} onChange={handleChange}/>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
}

export default Login;

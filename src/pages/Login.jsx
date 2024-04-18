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
        <div className='bg-gray-800 text-3xl py-6 text-white text-center'>Login Page</div>
        <div className='bg-gray-200 rounded-lg m-4 p-4 text-center'>
          <form id="loginForm" onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-x-2'>
              <label htmlFor="email" className='font-semibold'>Email address</label>
              <input type="email" placeholder="Enter email" name="email" id="email" value={formData.email} onChange={handleChange}/>
            </div>
            <div className='space-x-2'>
              <label htmlFor="password" className='font-semibold'>Password</label>
              <input type="password" placeholder="Password" name="password" id="password" value={formData.password} onChange={handleChange}/>
            </div>
            <button type="submit" className='bg-green-600 text-white px-6 py-2 rounded-lg hover:text-green-600 hover:bg-white
            border-2 border-green-500'>Login</button>
          </form>
        </div>
      </div>
    );
}

export default Login;

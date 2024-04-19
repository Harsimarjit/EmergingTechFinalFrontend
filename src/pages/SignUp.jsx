import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../graphql/mutations';

const SignUp = () => {

    const [formData, setFormData] = useState({ name: '',email: '', password: '', role: '' });
    const [addError, setAddError] = useState(null);
    
    const [addUser] = useMutation(ADD_USER, {
        onError: (error) => {
        console.error('Error registering user:', error);
        setAddError(error.message); 
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!formData.name || !formData.email || !formData.password || !formData.role) {
          alert('Please fill in all fields.');
          return;
        }
    
        try {
          const result = await addUser({
            variables: {
                name:formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
            },
          });
    
          if (result.data && result.data.addUser && result.data.addUser.token) {
            window.location.href = '/login';
          }
        } catch (error) {
          console.error('Error registering user:', error);
        }
      };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setAddError(null); 
      };

  return (
    <div>
    <h1 className='bg-gray-800 text-3xl py-6 text-white text-center'>Sign Up</h1>
    {
      addError &&
      <div className="bg-red-500 px-4 py-2 text-white" id="error">{addError}</div>
    }
    
    <form id="registerForm" className='bg-gray-200 rounded-lg m-4 p-4 text-center space-y-6' onSubmit={handleSubmit}>
        <div className="space-x-2" >
        <label htmlFor="name"  className='font-semibold'>Name</label>
        <input type="text" placeholder="Enter name" name="name" id="name" onChange={handleChange} required/>
        </div>
        <div className="space-x-2" >
        <label htmlFor="email" className='font-semibold'>Email address</label>
        <input type="email" placeholder="Enter email" name="email" id="email" onChange={handleChange} required/>
        </div>
        <div className="space-x-2">
        <label htmlFor="password" className='font-semibold'>Password</label>
        <input type="password" placeholder="Password" name="password" id="password" onChange={handleChange} required/>
        </div>
        <div className="space-x-2">
        <label htmlFor="role" className='font-semibold'>Role</label>
        <select className="select" name="role" id="role" onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="nurse">Nurse</option>
            <option value="patient">Patient</option>
        </select>
        </div>
        <button type="submit" className='bg-green-600 text-white px-6 py-2 rounded-lg hover:text-green-600 hover:bg-white
            border-2 border-green-500 text-center' >Sign Up</button>
    </form>
    </div>

  )
}

export default SignUp
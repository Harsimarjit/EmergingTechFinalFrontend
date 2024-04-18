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
    <div className="container">
    <h1 className="title">Register</h1>
    <div className="error" id="error"></div>
    <form id="registerForm" onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="name">Name</label>
        <input className="input" type="text" placeholder="Enter name" name="name" id="name" onChange={handleChange} required/>
        </div>
        <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input className="input" type="email" placeholder="Enter email" name="email" id="email" onChange={handleChange} required/>
        </div>
        <div className="form-group">
        <label htmlFor="password">Password</label>
        <input className="input" type="password" placeholder="Password" name="password" id="password" onChange={handleChange} required/>
        </div>
        <div className="form-group">
        <label htmlFor="role">Role</label>
        <select className="select" name="role" id="role" onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="nurse">Nurse</option>
            <option value="patient">Patient</option>
        </select>
        </div>
        <button className="button" type="submit" >Register</button>
    </form>
    </div>

  )
}

export default SignUp
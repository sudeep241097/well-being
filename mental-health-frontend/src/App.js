import React, { useEffect, useState } from 'react';
import api from './api';

function App() {
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    // Fetch the basic route from the backend
    useEffect(() => {
      api.get('/')
          .then((response) => {
              setMessage(response.data); // Display backend message
          })
          .catch((error) => {
              console.error('Error fetching backend message:', error);
              setMessage('Failed to load backend message');
          });
  }, []);
  

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users', formData);
            alert(response.data);
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Error creating user');
        }
    };

    return (
        <div>
            <h1>{message || 'Loading...'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Create User</button>
            </form>
        </div>
    );
}

export default App;

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './login.comp.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trimStart(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Both fields are required.');
      return;
    }

    try {
      console.log('Login attempt with formData:', formData);
      const payload = {
        email: formData.email.trim(),
        password: formData.password,
      };
      console.log('Sending payload to /api/users/login:', payload);

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}/api/users/login`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Login API response received:', response);
      console.log('Response data:', response.data);
      console.log('Token from response.data.token:', response.data?.token);

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Token set in localStorage. Value:', localStorage.getItem('token'));
        navigate('/ticket');
      } else {
        console.error('Token not found in response data or response.data is undefined.');
        toast.error('Login successful, but token was not received from server.');
      }
    } catch (err) {
      console.error('Login API error:', err);
      if (err.response) {
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
        console.error('Error response headers:', err.response.headers);
      } else if (err.request) {
        console.error('Error request data:', err.request);
      } else {
        console.error('Error message:', err.message);
      }

      if (err.response?.status === 401) {
        toast.error('Incorrect password. Please try again.', { duration: 5000 });
      } else {
        toast.error(err.response?.data?.error || 'Login failed. Please try again.', { duration: 5000 });
      }
    }
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="login-title">Employee Login</h1>
          <Form className="login-form" onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="username"
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="login-button">
              Login
            </Button>
          </Form>
          <div className="signup-link">
            <p>
              Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

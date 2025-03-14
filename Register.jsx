import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('ROLE_EMPLOYEE');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    
    setLoading(true);
    
    try {
      await register({
        email,
        password,
        fullName,
        role
      });
      
      // Registration successful, redirect to login
      navigate('/login', { state: { message: 'Registration successful! Please login.' } });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="text-center mb-4">
            <span className="text-primary h2">🏆 Achieve+</span>
          </div>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Create an account</h2>
              <p className="text-center text-muted mb-4">Enter your information to create your account</p>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSignup}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="John Doe" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="you@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="••••••••" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Account Type</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="Employee"
                      name="accountType"
                      id="employee"
                      checked={role === 'ROLE_EMPLOYEE'}
                      onChange={() => setRole('ROLE_EMPLOYEE')}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Admin"
                      name="accountType"
                      id="admin"
                      checked={role === 'ROLE_ADMIN'}
                      onChange={() => setRole('ROLE_ADMIN')}
                    />
                  </div>
                </Form.Group>
                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="py-2"
                    disabled={loading}
                  >
                    {loading ? 'Creating account...' : <><i className="bi bi-person-plus me-2"></i> Create account</>}
                  </Button>
                </div>
              </Form>
              <div className="text-center mt-4">
                <p>Already have an account? <Link to="/login" className="text-decoration-none">Sign in</Link></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
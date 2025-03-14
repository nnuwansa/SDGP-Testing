// import React, { useState } from 'react';
// import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const Signup = ({ onSignup }) => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [accountType, setAccountType] = useState('employee');

//   const handleSignup = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }
//     // In a real app, you would call an API here
//     onSignup(accountType);
//   };

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col md={6}>
//           <div className="text-center mb-4">
//             <span className="text-primary h2">🏆 Achieve+</span>
//           </div>
//           <Card className="shadow-sm">
//             <Card.Body className="p-4">
//               <h2 className="text-center mb-4">Create an account</h2>
//               <p className="text-center text-muted mb-4">Enter your information to create your account</p>
//               <Form onSubmit={handleSignup}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Full Name</Form.Label>
//                   <Form.Control 
//                     type="text" 
//                     placeholder="John Doe" 
//                     value={fullName}
//                     onChange={(e) => setFullName(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control 
//                     type="email" 
//                     placeholder="you@example.com" 
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control 
//                     type="password" 
//                     placeholder="••••••••" 
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Confirm Password</Form.Label>
//                   <Form.Control 
//                     type="password" 
//                     placeholder="••••••••" 
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-4">
//                   <Form.Label>Account Type</Form.Label>
//                   <div>
//                     <Form.Check
//                       inline
//                       type="radio"
//                       label="Employee"
//                       name="accountType"
//                       id="employee"
//                       checked={accountType === 'employee'}
//                       onChange={() => setAccountType('employee')}
//                     />
//                     <Form.Check
//                       inline
//                       type="radio"
//                       label="Admin"
//                       name="accountType"
//                       id="admin"
//                       checked={accountType === 'admin'}
//                       onChange={() => setAccountType('admin')}
//                     />
//                   </div>
//                 </Form.Group>
//                 <div className="d-grid">
//                   <Button variant="primary" type="submit" className="py-2">
//                     <i className="bi bi-person-plus me-2"></i> Create account
//                   </Button>
//                 </div>
//               </Form>
//               <div className="text-center mt-4">
//                 <p>Already have an account? <Link to="/login" className="text-decoration-none">Sign in</Link></p>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Signup;
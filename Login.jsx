// // --- Login.jsx ---
// import React, { useState } from 'react';
// import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
  
//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Demo credentials check
//     if ((email === 'admin@achieve.com' && password === 'password') || 
//         (email === 'employee1@achieve.com' && password === 'password')) {
//       const userType = email.includes('admin') ? 'admin' : 'employee';
//       onLogin(userType);
//     } else {
//       alert('Invalid credentials. Please try again.');
//     }
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
//               <h2 className="text-center mb-4">Welcome back</h2>
//               <p className="text-center text-muted mb-4">Enter your credentials to access your account</p>
//               <Form onSubmit={handleLogin}>
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
//                   <div className="d-flex justify-content-between">
//                     {/* <span>Password</span> */}
//                     <Link to="/forgot-password" className="text-decoration-none">Forgot password?</Link>
//                   </div>
//                   <Form.Control 
//                     type="password" 
//                     placeholder="••••••••" 
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <div className="d-grid mt-4">
//                   <Button variant="primary" type="submit" className="py-2">
//                     <i className="bi bi-box-arrow-in-right me-2"></i> Sign in
//                   </Button>
//                 </div>
//               </Form>
//               <div className="text-center mt-4">
//                 <p>Don't have an account? <Link to="/signup" className="text-decoration-none">Sign up</Link></p>
//               </div>
//               <div className="mt-3 pt-3 border-top">
//                 <p className="text-center mb-2 text-muted">Demo credentials:</p>
//                 <p className="text-center text-muted small">Admin: admin@achieve.com / password</p>
//                 <p className="text-center text-muted small">Employee: employee1@achieve.com / password</p>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { login } from '../api/auth';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login: authLogin } = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
    
//     try {
//       const response = await login({ email, password });
//       console.log('API Response:', response);
      
//       // The API sends the role in the token field
//       const userData = {
//         email: response.email,
//         fullName: response.fullName,
//         role: response.token // Use token as role since that's how the API sends it
//       };
      
//       console.log('Processed user data:', userData);
      
//       // Pass the data to auth context
//       authLogin(userData, response.token);
//     } catch (err) {
//       setError('Invalid credentials. Please try again.');
//       console.error('Login error:', err);
//     } finally {
//       setLoading(false);
//     }
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
//               <h2 className="text-center mb-4">Welcome back</h2>
//               <p className="text-center text-muted mb-4">Enter your credentials to access your account</p>
              
//               {error && <Alert variant="danger">{error}</Alert>}
              
//               <Form onSubmit={handleLogin}>
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
//                   <div className="d-flex justify-content-between">
//                     <Link to="/forgot-password" className="text-decoration-none">Forgot password?</Link>
//                   </div>
//                   <Form.Control 
//                     type="password" 
//                     placeholder="••••••••" 
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <div className="d-grid mt-4">
//                   <Button 
//                     variant="primary" 
//                     type="submit" 
//                     className="py-2"
//                     disabled={loading}
//                   >
//                     {loading ? 'Signing in...' : <><i className="bi bi-box-arrow-in-right me-2"></i> Sign in</>}
//                   </Button>
//                 </div>
//               </Form>
//               <div className="text-center mt-4">
//                 <p>Don't have an account? <Link to="/signup" className="text-decoration-none">Sign up</Link></p>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await login({ email, password });
      console.log('API Response:', response);
      
      // Correctly structure the user data
      const userData = {
        email: response.email,
        fullName: response.fullName,
        role: response.role // Use actual role from response
      };
      
      console.log('Processed user data:', userData);
      
      // Pass the data to auth context
      authLogin(userData, response.token);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', err);
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
              <h2 className="text-center mb-4">Welcome back</h2>
              <p className="text-center text-muted mb-4">Enter your credentials to access your account</p>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleLogin}>
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
                  <div className="d-flex justify-content-between">
                    <Link to="/forgot-password" className="text-decoration-none">Forgot password?</Link>
                  </div>
                  <Form.Control 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <div className="d-grid mt-4">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="py-2"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : <><i className="bi bi-box-arrow-in-right me-2"></i> Sign in</>}
                  </Button>
                </div>
              </Form>
              <div className="text-center mt-4">
                <p>Don't have an account? <Link to="/signup" className="text-decoration-none">Sign up</Link></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;





















































//for test
// import React, { useState } from 'react';
// import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { login } from '../api/auth';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login: authLogin } = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const response = await login({ email, password });
//       console.log('Login response:', response); // Debug the full response
      
//       // Make sure we're using the exact properties from the backend response
//       authLogin({
//         email: response.email,
//         fullName: response.fullName,
//         role: response.role // This should match exactly what comes from backend
//       }, response.token);
//     } catch (err) {
//       setError('Invalid credentials. Please try again.');
//       console.error('Login error:', err);
//     } finally {
//       setLoading(false);
//     }
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
//               <h2 className="text-center mb-4">Welcome back</h2>
//               <p className="text-center text-muted mb-4">Enter your credentials to access your account</p>

//               {error && <Alert variant="danger">{error}</Alert>}

//               <Form onSubmit={handleLogin}>
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
//                   <div className="d-flex justify-content-between">
//                     <Link to="/forgot-password" className="text-decoration-none">Forgot password?</Link>
//                   </div>
//                   <Form.Control 
//                     type="password" 
//                     placeholder="••••••••" 
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <div className="d-grid mt-4">
//                   <Button 
//                     variant="primary" 
//                     type="submit" 
//                     className="py-2"
//                     disabled={loading}
//                   >
//                     {loading ? 'Signing in...' : <><i className="bi bi-box-arrow-in-right me-2"></i> Sign in</>}
//                   </Button>
//                 </div>
//               </Form>
//               <div className="text-center mt-4">
//                 <p>Don't have an account? <Link to="/signup" className="text-decoration-none">Sign up</Link></p>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login;
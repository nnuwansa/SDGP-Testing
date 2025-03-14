// import React from 'react';
// import { Navbar as BsNavbar, Container, Nav, Dropdown } from 'react-bootstrap';

// const Navbar = ({ userType, onLogout }) => {
//   return (
//     <BsNavbar bg="white" expand="lg" className="shadow-sm">
//       <Container fluid className="px-4">
//         <BsNavbar.Brand href="#" className="d-flex align-items-center">
//           <span className="text-primary h4 mb-0">🏆 Achieve+</span>
//         </BsNavbar.Brand>
//         <Nav className="ms-auto d-flex align-items-center">
//           <Dropdown align="end">
//             <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center border-0">
//               <div className="bg-primary rounded-circle text-white d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
//                 <i className="bi bi-person-fill"></i>
//               </div>
//               <span className="d-none d-md-inline">
//                 {userType === 'admin' ? 'Admin User' : 'Employee User'}
//                 <small className="d-block text-muted">{userType}</small>
//               </span>
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item href="#profile">Profile</Dropdown.Item>
//               <Dropdown.Item href="#settings">Settings</Dropdown.Item>
//               <Dropdown.Divider />
//               <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </Nav>
//       </Container>
//     </BsNavbar>
//   );
// };

// export default Navbar;

import React from 'react';
import { Navbar as BsNavbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout, isAdmin } = useAuth();

  return (
    <BsNavbar bg="white" expand="lg" className="shadow-sm">
      <Container fluid className="px-4">
        <BsNavbar.Brand href="#" className="d-flex align-items-center">
          <span className="text-primary h4 mb-0">🏆 Achieve+</span>
        </BsNavbar.Brand>
        <Nav className="ms-auto d-flex align-items-center">
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center border-0">
              <div className="bg-primary rounded-circle text-white d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                <i className="bi bi-person-fill"></i>
              </div>
              <span className="d-none d-md-inline">
                {currentUser?.fullName}
                <small className="d-block text-muted">{isAdmin ? 'Admin' : 'Employee'}</small>
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#profile">Profile</Dropdown.Item>
              <Dropdown.Item href="#settings">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
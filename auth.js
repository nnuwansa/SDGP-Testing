



import axiosInstance, { authAxios } from './axiosConfig';

export const login = async (credentials) => {
  try {
    console.log('Attempting login with:', credentials);
    
    const authRequest = {
      email: credentials.email,
      password: credentials.password
    };

    const response = await authAxios.post('/auth/login', authRequest, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Login response:', response.data);

    // Extract the JWT token from the response data
    const jwtToken = extractJwtToken(response.data);
    console.log('Extracted JWT token:', jwtToken);
    
    if (jwtToken) {
      // Store the JWT token in localStorage
      localStorage.setItem('token', jwtToken);
      
      // Extract and determine the correct role
      let userRole;
      
      // Check if there's a specific role field that is not a JWT token
      if (response.data.role && !isJwtToken(response.data.role)) {
        userRole = response.data.role;
      } 
      // If the "token" field contains a role-like string (not a JWT)
      else if (response.data.token && !isJwtToken(response.data.token) && 
              (response.data.token.includes('ROLE_'))) {
        userRole = response.data.token;
      }
      // Default to ROLE_USER if no role found
      else {
        // Check if we can extract a role from other response fields
        if (response.data.authorities && Array.isArray(response.data.authorities)) {
          userRole = response.data.authorities[0]?.authority || 'ROLE_USER';
        } else {
          userRole = 'ROLE_USER';
        }
      }
      
      // Force admin role for testing if needed
      // Remove this line in production or set based on actual response
      // userRole = 'ROLE_ADMIN'; 
      
      console.log('Determined user role:', userRole);
      
      const userData = {
        email: response.data.email,
        fullName: response.data.fullName,
        role: userRole,
        token: jwtToken // Include token in user data for convenience
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Set the Authorization header for immediate use
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
      console.log('Authorization header set:', axiosInstance.defaults.headers.common['Authorization']);
      
      return {
        token: jwtToken,
        email: response.data.email,
        fullName: response.data.fullName,
        role: userRole
      };
    } else {
      console.error('No JWT token found in the response:', response.data);
      throw new Error('No valid JWT token found in server response');
    }
  } catch (error) {
    console.error('Login error:', error.response || error);
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 403) {
        throw { message: 'Access denied. Please check your credentials.' };
      } else if (status === 401) {
        throw { message: 'Invalid email or password.' };
      } else if (data && data.message) {
        throw { message: data.message };
      }
    }
    
    throw { message: 'Login failed. Please try again.' };
  }
};

export const register = async (userData) => {
  try {
    const response = await authAxios.post('/auth/register', userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    if (error.response?.data) {
      throw error.response.data;
    } else {
      throw { message: 'Registration failed. Please try again.' };
    }
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Clear the Authorization header
  delete axiosInstance.defaults.headers.common['Authorization'];
};

export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      return user;
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
      return null;
    }
  }
  return null;
};

export const getCurrentToken = () => {
  return localStorage.getItem('token');
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === 'ROLE_ADMIN';
};

// Helper function to extract the JWT token from various possible locations in the response
function extractJwtToken(responseData) {
  // Check if token is in the standard 'token' field
  if (responseData.token && isJwtToken(responseData.token)) {
    return responseData.token;
  }
  
  // Check if token is in the 'jwt' field
  if (responseData.jwt && isJwtToken(responseData.jwt)) {
    return responseData.jwt;
  }
  
  // Check if token is in the 'access_token' field
  if (responseData.access_token && isJwtToken(responseData.access_token)) {
    return responseData.access_token;
  }
  
  // Based on your localStorage content, the token appears to be in the 'role' field in some cases
  if (responseData.role && isJwtToken(responseData.role)) {
    return responseData.role;
  }
  
  // Check if token is directly in the response (if response is a string)
  if (typeof responseData === 'string' && isJwtToken(responseData)) {
    return responseData;
  }
  
  // Fall back to looking in every field
  for (const key in responseData) {
    if (responseData[key] && isJwtToken(responseData[key])) {
      return responseData[key];
    }
  }
  
  return null;
}

// Helper function to check if a string is likely a JWT token
function isJwtToken(str) {
  return typeof str === 'string' && 
         str.startsWith('eyJ') && 
         str.split('.').length === 3;
}
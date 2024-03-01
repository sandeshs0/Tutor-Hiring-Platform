import { jwtDecode } from 'jwt-decode';
import { myAxios } from "./helper";


const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};



export const Register = (userData: any) => { 
  const formData = new FormData();


  Object.keys(userData).forEach(key => {
      formData.append(key, userData[key]);
  });

  return myAxios
      .post('/user/save', formData, {
          headers: {
              'Content-Type': 'multipart/form-data' 
          }
      })
      .then(response => response.data)
      .catch(error => {
          console.error("Error registering user:", error);
          throw error;
      });
};



export const Login = (credentials: { email: string; password: string; }) => {
  return myAxios
  .post('/user/login',  credentials)
  .then((response) => {
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      
      return response.data;
  });
};

export const BASE_URL = 'http://localhost:8080';

export const getTutorByEmail = async () => {
    try {
      const token = getTokenFromLocalStorage();
      if (!token) {
        throw new Error('Token not found in local storage');
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;
      console.log(userId);
      myAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await myAxios.get(`user/getByUId/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
};


export const getBookingsOfLoggedInUser = async () => {
  try {
      const token = getTokenFromLocalStorage();
      if (!token) {
          throw new Error('Token not found in local storage');
      }
      myAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await myAxios.get('bookings/my-bookings');
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const acceptBooking = async (bookingId: number) => {
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      throw new Error('Token not found in local storage');
    }
    myAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await myAxios.put(`bookings/${bookingId}/accept`);
  } catch (error) {
    throw error;
  }
};

export const rejectBooking = async (bookingId: number) => {
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      throw new Error('Token not found in local storage');
    }
    myAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await myAxios.delete(`bookings/${bookingId}`);
  } catch (error) {
    throw error;
  }
};

export const updateTutor = async (email: any, userData: any) => {
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      throw new Error('Token not found in local storage');
    }
    myAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await myAxios.put(`${BASE_URL}/user/updateTutor/${email}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating tutor: ${error}`);
  }
};
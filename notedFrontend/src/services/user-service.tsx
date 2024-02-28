import { jwtDecode } from 'jwt-decode';
import { myAxios } from "./helper";

// Function to fetch the token from local storage
const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};

export const Register = (user)=>{
    return myAxios
    .post('/user/save', user)
    .then((response)=> response.data)
};

export const Login = (credentials) => {
    return myAxios
    .post('/user/login',  credentials)
    .then((response)=>response.data)
}

export const BASE_URL = 'http://localhost:8082';

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
  
      const response = await myAxios.get(`/getTutorByEmail/${userId}`);

      return response.data;
    } catch (error) {
      throw error;
    }
};
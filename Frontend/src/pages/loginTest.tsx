import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login, getTutorByEmail } from '../services/user-service';

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = event.target;
    setCredentials({
      ...credentials,
      [field]: value,
    });
  };

  const navigate= useNavigate();


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(credentials);
    if (!credentials.email || !credentials.password) {
      toast.error('Fill in all fields');
      return;
    }

 Login(credentials)
 .then((jwtTokenData) => {
   console.log('user logged in: ');
   console.log(jwtTokenData);
   
   localStorage.setItem('token', jwtTokenData.token);
   
   toast.success("Logged In Successfully.");
   navigate('/tutorDash');
   console.log(getTutorByEmail());
 })
 .catch((error) => {
   console.log(error);
   if (error.response && (error.response.status === 400 || error.response.status === 404)) {
     toast.error(error.response.data.message);
   } else {
     toast.error('Something went wrong !!');
   }
 })
};

  const handleReset = () => {
    setCredentials({
      email: '',
      password: '',
    });
  };


  return (
    <div className='flex justify-center items-center h-screen'>
    <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
        <h1 className='text-5xl font-semibold'>Welcome Back</h1>
        <p className='font-medium text-lg text-gray-500 mt-4'>Welcome back! Please enter your details.</p>
        
        <div className='mt-8'>
          
              <div className='flex flex-col'>
                  <label className='text-lg font-medium'>Email</label>
                  <input 
                  type="text"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={(e) => handleChange(e, 'email')}
                      className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                      placeholder="Enter your email"/>
              </div>
              <div className='flex flex-col mt-4'>
                  <label className='text-lg font-medium'>Password</label>
                  <input 
                  
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={(e) => handleChange(e, 'password')}
                      className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                      placeholder="Enter your password"
                      type="password"
                  />
              </div>
              
              <form onSubmit={handleSubmit} >
              <div className='mt-8 flex flex-col gap-y-4'>
                  <button  onSubmit={handleSubmit} type="submit" className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Sign in</button>
                  
              </div>
              </form>
              <div className='mt-8 flex justify-center items-center'>
                  <p className='font-medium text-base'>Don't have an account?</p>
                 
                 <Link to="/register">
                  <button className='ml-2 font-medium text-base text-violet-500'>Sign up</button>
                  </Link>
              </div>
           
        </div>
        
    </div>
    </div>
);
};

export default LoginPage;
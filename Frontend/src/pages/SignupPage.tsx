import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Register } from '../services/user-service';


interface tutorData {
    fullName: string,
        subject: string,
        userName: string, 
        email: string,
        phone: string,
        address: string,
        bio: string,
        profilePic: File | null;
        monthlyFee: number,
        yearsOfExp: number,        
        password: string,
}

const SignupPageForm: React.FC = () => {
  const navigate = useNavigate();
  const [tutorData, settutorData] = useState<tutorData>({
    fullName: '',
    subject: '',
    userName: '', 
    email: '',
    phone: '',
    address: '',
    bio: '',
    profilePic:null,
    monthlyFee: 0,
    yearsOfExp: 0,        
    password: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    settutorData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const profilePic = e.target.files && e.target.files[0];
    settutorData(prevData => ({
      ...prevData,
      profilePic: profilePic || null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    
      console.log(tutorData)
      await Register(tutorData);
      toast.success("Tutor created Successfully!")
      navigate("/tutor-login")
    } catch (error) {
        console.log(tutorData);
      toast.error("This user already exists.")
    }
  };


  const [showPassword, setShowPassword] = useState(false);


  return (
    <div className='flex justify-center bg-gray-50 my-10 items-center'>

    <div className='w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-300'>
        <h1 className='text-3xl font-semibold'>Tutor Registration</h1>
        <p className='font-medium text-lg text-gray-500 mt-4'>Hello! Let's start your tutoring journing here!</p>
        <div className='mt-8'>
            <div className='flex flex-col'>
                <label className='text-lg font-medium' htmlFor="fullName">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={tutorData.fullName}
                    onChange={handleChange}
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder="Enter your Full Name" />
            </div>

            <div className='flex flex-col'>
                <label className='text-lg font-medium' htmlFor="userName">User Name</label>
                <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={tutorData.userName}
                    onChange={handleChange}
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder="Enter your display username" />
            </div>

            <div className='flex flex-col'>
          <label className='text-lg font-medium' htmlFor="subject">Subject</label>
          <select
              id="subject"
              name="subject"
              value={tutorData.subject}
             onChange={handleChange}
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
          >
              <option value="">Select a subject</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Programming">Programming</option>
              <option value="Maths">Maths</option>
              <option value="English">English</option>
              <option value="Science">Science</option>
              <option value="Physics">Physics</option>
              <option value="Language">Language</option>
              <option value="Finance">Finance</option>
          </select>
      </div>
            
            <div className='flex flex-col'>
                <label className='text-lg font-medium' htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={tutorData.address}
                    onChange={handleChange}
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder="Eg: Dillibazar, Kathmandu" />
            </div>

            <div className='flex flex-col'>
                <label className='text-lg font-medium' htmlFor="bio">About Yourself</label>
                <input
                    type="text"
                    id="bio"
                    name="bio"
                    value={tutorData.bio}
                    onChange={handleChange}
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder="Describe about yourself in short (Education, yearsOfExpertise)" />
            </div>
            
            <div className='flex flex-col'>
                <label className='text-lg font-medium' htmlFor="yearsOfExp">Years of Experience</label>
                <input
                    type="text"
                    id="yearsOfExp"
                    name="yearsOfExp"
                    value={tutorData.yearsOfExp}
                    onChange={handleChange}
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder="Your yearsOfExperience" />
            </div>

            <div className='flex flex-col'>
                <label className='text-lg font-medium' htmlFor="profilePic">Profile Pic</label>
                <input
                type="file"
                id="profilePic"
                name="profilePic"
                onChange={handleImageChange}  
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder="profile pic"
            />
            </div>

            <div className='flex flex-col'>
                <label className='text-lg font-medium' htmlFor="monthlyFee">Monthly Fee</label>
                <input
                    type="text"
                    id="monthlyFee"
                    name="monthlyFee"
                    value={tutorData.monthlyFee}
                    onChange={handleChange}
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder="Fee" />
            </div>

            <div className='flex flex-col'>
                <label className='text-lg font-medium' htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={tutorData.email}
                    onChange={handleChange}
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder="Enter your email" />
            </div>

            <div className='flex flex-col'>
                <label className='text-lg font-medium' htmlFor="phone">Phone</label>
                <input
                    type="email"
                    id="phone"
                    name="phone"
                    value={tutorData.phone}
                    onChange={handleChange}
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder="Enter your phone" />
            </div>

            <div className='flex flex-col'>
                <label className='text-lg font-medium' htmlFor="password">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={tutorData.password}
                        onChange={handleChange}
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder="Enter your Password" />
                    {/* <span
                        className="absolute right-4 top-2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ?
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.4 4.6a1 1 0 00-1.4 0l-1.32 1.32A9.917 9.917 0 0012 4a9.917 9.917 0 00-5.68 1.92L4.6 4.6a1 1 0 10-1.4 1.4l14 14a1 1 0 001.4 0l1.32-1.32A9.917 9.917 0 0020 12c0-2.43-.88-4.67-2.36-6.38L19.4 4.6zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                    </span> */}
                </div>
            </div>

            <div className='flex items-center mt-4'>
                <input
                    type="checkbox"
                    id="showPasswordCheckbox"
                    className="mr-2"
                    onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="showPasswordCheckbox" className="text-lg font-medium text-gray-700 cursor-pointer">Show Password</label>
            </div>

            <form onSubmit={handleSubmit} >
                <div className='mt-8 flex flex-col gap-y-4'>
                    <button type="submit" className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Sign Up</button>
                </div>
            </form>
            <div className='mt-8 flex justify-center items-center'>
                <p className='font-medium text-base'>Already Signed In?</p>
                <Link to="/tutor-login" className='ml-2 font-medium text-base text-violet-500'>log in</Link>
            </div>
        </div>
    </div>
</div>
  );
};

export default SignupPageForm;
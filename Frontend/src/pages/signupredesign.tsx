import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Register } from '../services/user-service';

const SignupPage: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        subject: '',
        userName: '',
        email: '',
        phone: '',
        address: '',
        bio: '',
        monthlyFee: 0,
        yearsOfExp: 0,
        password: '',
    });
    const [profilePic, setProfilePic] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const parsedValue = name === 'yearsOfExp' || name === 'monthlyFee' ? parseFloat(value) : value;
        setFormData({
            ...formData,
            [name]: parsedValue,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setProfilePic(file);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateEmail(formData.email)) {
            toast.error('Invalid email format');
            return;
        }

        if (!validatePhoneNumber(formData.phone)) {
            toast.error('Invalid phone number format. Please enter a 10-digit number.');
            return;
        }

        const requiredFields = ['fullName', 'subject', 'userName', 'email', 'phone', 'address', 'bio', 'monthlyFee', 'yearsOfExp', 'password'];
        if (requiredFields.some(field => !formData[field])) {
            toast.error('Fill in all fields');
            return;
        }

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => data.append(key, value as string));
            if (profilePic) {
                data.append('profilePic', profilePic);
            }
            console.log(data);
            const resp = await Register(data);
            console.log(resp);
            toast.success("User Registered Successfully");
            window.location.href = '/tutor-login';
        } catch (error) {
            console.error(error);
            toast.error("Couldn't register: " + error);
        }
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber: string) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='flex justify-center my-10 items-center'>
            <div className='w-11/12 max-w-[900px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-300'>
                <h1 className='text-5xl font-semibold'>Tutor Registration</h1>
                <p className='font-medium text-lg text-gray-500 mt-4'>Hello! Let's start your tutoring journey here!</p>
                <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-6 mt-8'>
                    <div className='col-span-1'>
                        <div className='flex flex-col'>
                            <label className='text-lg font-medium' htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className='border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder="Enter your Full Name"
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label className='text-lg font-medium' htmlFor="userName">User Name</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                className='border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder="Enter your display username"
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label className='text-lg font-medium' htmlFor="subject">Subject</label>
                            <select
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className='border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
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
                                value={formData.address}
                                onChange={handleChange}
                                className='border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder="Eg: Dillibazar, Kathmandu"
                            />
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='flex flex-col'>
                            <label className='text-lg font-medium' htmlFor="bio">About Yourself</label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                className='border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder="Describe about yourself in short (Education, yearsOfExpertise)"
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label className='text-lg font-medium' htmlFor="yearsOfExp">Years of Experience</label>
                            <input
                                type="number"
                                id="yearsOfExp"
                                name="yearsOfExp"
                                value={formData.yearsOfExp}
                                onChange={handleChange}
                                className='border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder="Your yearsOfExperience"
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label className='text-lg font-medium' htmlFor="profilePic">Profile Pic</label>
                            <input
                                type="file"
                                id="profilePic"
                                name="profilePic"
                                onChange={handleImageChange}
                                className='border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder="profile pic"
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label className='text-lg font-medium' htmlFor="monthlyFee">Monthly Fee</label>
                            <input
                                type="number"
                                id="monthlyFee"
                                name="monthlyFee"
                                value={formData.monthlyFee}
                                onChange={handleChange}
                                className='border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder="Fee"
                            />
                        </div>
                    </div>
                    <div className='col-span-2'>
                        <div className='flex flex-col'>
                            <label className='text-lg font-medium' htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className='border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label className='text-lg font-medium' htmlFor="phone">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className='border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder="Enter your phone"
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label className='text-lg font-medium' htmlFor="password">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className='border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                placeholder="Enter your Password"
                            />
                        </div>
                    </div>
                    <div className='col-span-2'>
                        <div className='flex items-center mt-4'>
                            <input
                                type="checkbox"
                                id="showPasswordCheckbox"
                                className="mr-2"
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <label htmlFor="showPasswordCheckbox" className="text-lg font-medium text-gray-700 cursor-pointer">Show Password</label>
                        </div>

                        <div className='mt-8 flex flex-col gap-y-4'>
                            <button type="submit" className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Sign Up</button>
                        </div>

                        <div className='mt-8 flex justify-center items-center'>
                            <p className='font-medium text-base'>Already Signed In?</p>
                            <Link to="/tutor-login" className='ml-2 font-medium text-base text-violet-500'>log in</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;

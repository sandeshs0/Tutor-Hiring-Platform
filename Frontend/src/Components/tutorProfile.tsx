import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { submitBookingForm } from '../services/BookingHelper';

interface TutorDetailCardProps {
    id: number;
    fullName: string;
    username: string;
    subject: string;
    address: string;
    bio: string;
    yearsOfExp: number;
    monthlyFee: number;
    profilePic: string;
    availability: string;

}

const TutorDetailCard: React.FC<TutorDetailCardProps> = ({ fullName, username, bio, subject, yearsOfExp, monthlyFee, profilePic, id, address, availability }) => {
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [formData, setFormData] = useState({
        studentName: '',
        time: '',
        grade: '',
        requirements: '',
        location: '',
        email:'',
        offerFee:''
    });

    const toggleBookingForm = () => {
        setShowBookingForm(!showBookingForm);
    };

    const handleSubmitBooking = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            userId: id,
            studentName: formData.studentName,
            time: formData.time,
            grade: formData.grade,
            requirements: formData.requirements,
            location: formData.location,
            tutorEmail:username,
            studentEmail:formData.email,
            offeredFee: parseInt(formData.offerFee)
        };
        console.log('Booking form payload', payload);
        try {
          await submitBookingForm(payload);
      } catch (error) {
          console.error('Error submitting booking form:', error);
          toast.error("Something went wrong");
      }
        
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mt-4 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img
                        alt="ecommerce"
                        className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                        src={`data:image/jpeg;base64,${profilePic}`}
                    />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                            Tutor Details
                        </h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                            {fullName}
                        </h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                <span className="text-gray-800 ml-3 text-md">{subject}</span>
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2">
                                Exp: {yearsOfExp} Years
                            </span>
                        </div>
                        <p className="leading-relaxed">{bio}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <div className="flex">
                                <span className="mr-3"> {address}</span>
                            </div>
                            <div className="flex ml-6 items-center">
                                <span className="mr-3">Available For: {availability} </span>
                            </div>
                        </div>
                        <div className="flex">
                            <span className="title-font font-medium text-2xl text-gray-900">
                                Rs. {monthlyFee} /mo
                            </span>
                            <button onClick={toggleBookingForm} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                Proceed Booking
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showBookingForm && (
                <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex items-center justify-center z-10">
                    <div className="bg-white p-8 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Booking Form</h2>
                        <form onSubmit={handleSubmitBooking}>
                            <div className="mb-4">
                                <label htmlFor="studentName" className="block text-gray-700 font-bold mb-2">Student Name</label>
                                <input type="text" id="studentName" name="studentName" className="border-2 border-gray-300 p-2 w-full" required onChange={handleChange} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="time" className="block text-gray-700 font-bold mb-2">Preferred Time (between {availability})</label>
                                <input type="text" id="time" name="time" className="border-2 border-gray-300 p-2 w-full" required onChange={handleChange} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="grade" className="block text-gray-700 font-bold mb-2">Grade</label>
                                <input type="text" id="grade" name="grade" className="border-2 border-gray-300 p-2 w-full" required onChange={handleChange} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                                <input type="email" id="email" name="email" className="border-2 border-gray-300 p-2 w-full" required onChange={handleChange} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="requirements" className="block text-gray-700 font-bold mb-2">Requirements</label>
                                <input type="text" id="requirements" name="requirements" className="border-2 border-gray-300 p-2 w-full" required onChange={handleChange} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location</label>
                                <input type="text" id="location" name="location" className="border-2 border-gray-300 p-2 w-full" required onChange={handleChange} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="offerFee" className="block text-gray-700 font-bold mb-2">Offered Fee</label>
                                <input type="text" id="location" name="offerFee"  defaultValue={monthlyFee} className="border-2 border-gray-300 p-2 w-full" required onChange={handleChange} />
                            </div>
                            <div className="flex justify-between">
                                <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">Submit</button>
                                <button type="button" onClick={toggleBookingForm} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-gray-600">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TutorDetailCard;

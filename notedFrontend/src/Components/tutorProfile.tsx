import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface TutorDetailCardProps {
    id:number,
    fullName: string;
    username: string;
    subject: string;
    address:string;
    bio:string;
    yearsOfExp: number;
    monthlyFee: number;
    profilePic: string;
    availability:string;
}

const TutorDetailCard: React.FC<TutorDetailCardProps> = ({ fullName, username, bio, subject, yearsOfExp, monthlyFee, profilePic,id ,address, availability}) => {
    return (
        
        <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://dummyimage.com/400x400"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {fullName}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  {/* Repeat the SVG elements as necessary */}
                  <span className="text-gray-800 ml-3 text-md">{subject}</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2">
                Exp: {yearsOfExp} Years
                </span>
              </div>
              <p className="leading-relaxed">
                {bio}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3"><FontAwesomeIcon icon={faMapMarkerAlt} /> {address}</span>
                  {/* Color selection buttons */}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Available For: {availability} </span> 
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Rs. {monthlyFee} /mo
                </span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Proceed Booking
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default TutorDetailCard;

import React from 'react';

interface TutorProfileCardProps {
    id:number,
    fullName: string;
    username: string;
    subject: string;
    yearsOfExp: number;
    monthlyFee: number;
    profilePic: string;
}

const TutorProfileCard: React.FC<TutorProfileCardProps> = ({ fullName, username, subject, yearsOfExp, monthlyFee, profilePic,id }) => {
    return (
        
        <div className="w-full max-w-sm bg-[#f7f5fd] border border-gray-200 rounded-lg shadow">
            <div className="flex justify-end px-4 pt-4">
            </div>
            <div className="flex flex-col items-center pb-10">
            <img className="w-28 h-28 mb-3 rounded-full shadow-lg border-2 border-purple-500"
        src={`data:image/jpeg;base64,${profilePic}`}
        alt={fullName}/>
                <h5 className="mb-1 text-xl font-medium text-gray-900">{fullName}</h5>
                {/* <span className="text-sm text-gray-500 mb-1"> {username}</span> */}
                <div className="mb-1">
                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 text-sm font-semibold rounded-lg mr-2">
                        {subject}
                    </span>
                </div>
                <span className="text-md text-gray-500 mb-1 font-semibold">Experience: {yearsOfExp} years</span>
                <div className="mt-2 flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-900">
                        Monthly Fee: 
                    </span>
                    <span className="text-lg font-semibold text-blue-700 ml-1">
                        Rs. {monthlyFee.toFixed(2)}
                    </span>
                </div>
                <div className="flex mt-4 md:mt-6">
                    <a href={`/tutorDetail/${id}`} className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        Book Tutor
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TutorProfileCard;

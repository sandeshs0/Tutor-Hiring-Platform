// Home.tsx
import React, { useEffect, useState } from 'react';
import Hero from '../Components/betterHero';
import Footer from '../Components/footer';
import NavBar from '../Components/navbar';
import SortingOptions from '../Components/sortingOption';
import TutorProfileCard from '../Components/tutorCard';
import { filterTutorsBySubject, getAllTutors, sortTutorsByExperience } from '../services/tutorCardService';

const Home: React.FC = () => {
    const [tutors, setTutors] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');

    useEffect(() => {
        fetchTutors();
    }, [sortBy, selectedSubject]);

    const fetchTutors = async () => {
        try {
            let tutorsData;
            if (sortBy === 'experience') {
                tutorsData = await sortTutorsByExperience();
            } else if (sortBy === 'fee') {
                tutorsData = await getAllTutors();
            } else if (selectedSubject) {
                tutorsData = await filterTutorsBySubject(selectedSubject);
            } else {
                tutorsData = await getAllTutors();
            }
            setTutors(tutorsData);
        } catch (error) {
            console.error('Error fetching tutors:', error);
        }
    };

    return (
        <>
            <NavBar />
            <Hero />
            <div className="flex justify-center mb-10">
  <div className="container mx-auto px-4 text-center">
    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
      Your Tutor, Your <mark className="px-2 text-white bg-indigo-700 rounded">Choice</mark>
    </h1>
    <p className="text-lg font-normal text-gray-500 lg:text-xl">
      Find the appropriate match who can not only tutor you but mentor you for life.
    </p>
  </div>
</div>


            <SortingOptions 
            onSelectSortBy={(sortBy: string) => setSortBy(sortBy)}
            onSelectSubject={(subject: string) => setSelectedSubject(subject)}
             />
            <div className="container mx-10 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {tutors.map((tutor: any, index: number) => (
                        <TutorProfileCard
                            key={index}
                            id={tutor.id}
                            fullName={tutor.fullName}
                            username={tutor.username}
                            subject={tutor.subject}
                            monthlyFee={tutor.monthlyFee}
                            yearsOfExp={tutor.yearsOfExp}
                            profilePic={tutor.profilePic}
                        />
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Home;
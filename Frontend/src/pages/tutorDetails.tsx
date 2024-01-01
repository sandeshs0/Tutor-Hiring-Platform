import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../Components/footer';
import NavBar from '../Components/navbar';
import TutorDetailCard from '../Components/tutorProfile';
import { getTutorById } from '../services/tutorCardService';

const TutorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [tutor, setTutor] = useState<any>(null);

  useEffect(() => {
    const fetchTutorDetails = async () => {
      try {
        if (id) {
          const tutorData = await getTutorById(parseInt(id)); 
          setTutor(tutorData); 
        } else {
          console.error('No ID provided.');
        }
      } catch (error) {
        console.error('Error fetching tutor details:', error);
      }
    };
  
    fetchTutorDetails(); 
  }, [id]); 

  return (
    <div>
      <NavBar/>
      {tutor ? (
        <TutorDetailCard
          id= {tutor.id}
          bio={tutor.bio}
          address={tutor.address}
          fullName={tutor.fullName}
          username={tutor.username}
          subject={tutor.subject}
          yearsOfExp={tutor.yearsOfExp}
          monthlyFee={tutor.monthlyFee}
          profilePic={tutor.profilePic}
          availability='2PM to 4PM'
        />
      ) : (
        <p>Loading...</p>
      )}
      <Footer/>
    </div>
  );
};

export default TutorDetailPage;
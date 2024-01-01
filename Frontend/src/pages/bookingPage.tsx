import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../Components/bookingComp';
import { getTutorById } from '../services/tutorCardService';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tutor, setTutor] = useState<any>(null);

  useEffect(() => {
    console.log("Id:"+id);
    const fetchTutorDetails = async () => {
      try {
        if (id) {
          const tutorData = await getTutorById(parseInt(id)); 
          setTutor(tutorData); 
        } else {
            console.log("Id:"+id);
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
      {/* <NavBar/> */}
      {tutor ? (
        <BookingForm
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
      {/* <Footer/> */}
    </div>
  );
};

export default BookingPage;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { acceptBooking, getBookingsOfLoggedInUser, getTutorByEmail, rejectBooking, updateTutor } from '../services/user-service';

const TutorDash: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [showBookings, setShowBookings] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);


  const [showRejectConfirmModal, setShowRejectConfirmModal] = useState(false);

  const toggleBookings = () => {
    setShowBookings(!showBookings);
  };
  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getTutorByEmail();
        const bookingsResponse = await getBookingsOfLoggedInUser();
        
        const filteredBookings = bookingsResponse.filter((booking: { accepted: any; }) => !booking.accepted);
        
        setUserData(userData);
        setBookings(filteredBookings);
        toast.success("Data Fetched");
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error("Error fetching data");
      }
    };
  
    fetchData();
  }, []);

  const handleAcceptBooking = async (bookingId: string) => {
    try {
      const id = parseInt(bookingId, 10);
      await acceptBooking(id);
      const updatedBookings = await getBookingsOfLoggedInUser();
      const filteredBookings = updatedBookings.filter((booking: { accepted: any; }) => !booking.accepted);

      setBookings(filteredBookings);
      toast.success("Booking accepted successfully");
    } catch (error) {
      console.error('Error accepting booking:', error);
      toast.error("Error accepting booking");
    }
    setShowConfirmModal(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
  };
  // New function for handling reject booking
  const handleRejectBooking = async (bookingId: string) => {
    try {
      const id = parseInt(bookingId, 10);
      await rejectBooking(id);
      const updatedBookings = await getBookingsOfLoggedInUser();
      const filteredBookings = updatedBookings.filter((booking: { accepted: any; }) => !booking.accepted);
      setBookings(filteredBookings);
      toast.success("Booking rejected successfully");
      
    } catch (error) {
      console.error('Error rejecting booking:', error);
      toast.error("Error rejecting booking");
    }
    setShowRejectConfirmModal(false);
  };

  const updateProfile = async () => {
    try {
      const { fullName, address, subject, bio, monthlyFee, yearsOfExp } = userData;
    
      // Create a payload object with only the required fields
      const updatedData = { fullName, address, subject, bio, monthlyFee, yearsOfExp };
  
      const updatedUserData = await updateTutor(userData.email, updatedData);
      setUserData(updatedUserData);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Error updating profile");
    }
  };

    return (
      <body className="bg-gray-100">
        <aside className="fixed top-0 z-10 left-0 flex h-screen w-64 bg-white border-r border-gray-200">
          <div className="px-6 py-4 w-full">
            <a href="#" title="home">
              <img src="https://i.postimg.cc/ZKv2V8F7/logo.png" className="w-32 mx-auto" alt="Logo" />
            </a>
            {userData && (
              <div className="mt-8 text-center">
                <img
                  src={`data:image/jpeg;base64,${userData.profilePic}`}
                  alt=""
                  className="m-auto h-24 w-24 rounded-full object-cover border-4 border-blue-800"
                />
                <h5 className="mt-4 text-xl font-semibold">{userData.fullName}</h5>
                <p className="text-gray-800">{userData.address}</p>
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 text-sm font-semibold rounded-lg mr-2">
                        {userData.subject}
                    </span>
                <p className="text-gray-800 mt-2">
                <span className="inline-block bg-yellow-300 text-red-800 border-2 border-blue-300 px-2 py-1 text-sm font-semibold rounded-xl mr-2">
                        XP: {userData.yearsOfExp}
                    </span></p>

               


              </div>
            )}
            <div className="mt-8">
              <button className="bg-indigo-700 text-white w-full py-2 rounded-md" onClick={toggleBookings}>
                {showBookings ? "Hide Booking Requests" : "Show Booking Requests"}
              </button>
            </div>
            <button className="mt-8 bg-indigo-900 text-white w-full py-2 rounded-md mb-4" onClick={toggleProfileModal}>
            My Profile
          </button>
            <div className="mt-40">

              <Link
              to="/"
              onClick={handleLogout}
              className="group bg-grey-100 border-2 border-blue-300  flex items-center space-x-4 text-lg rounded-md px-4 py-3 text-gray-600 w-full"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Logout</span>
            </Link>
            </div>
          </div>
        </aside>

        <main className="ml-64 p-8">
          <div className="sticky top-0 bg-white shadow-md p-4">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
          </div>

          {showBookings && (
            <div className="overflow-x-auto mt-8">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-blue-800 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-blue-800 uppercase tracking-wider">Grade</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-blue-800 uppercase tracking-wider">Requirements</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-blue-800 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-blue-800 uppercase tracking-wider">Offered Fee</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-blue-800 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-blue-800 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.student_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.grade}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.requirements}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.offeredFee}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* Accept button */}
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                        onClick={() => {
                          setSelectedBookingId(booking.id);
                          setShowConfirmModal(true);
                        }}
                      >
                        Accept
                      </button>
                      {/* Reject button */}
                      <button className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => {
                        setSelectedBookingId(booking.id);
                        setShowRejectConfirmModal(true);
                      }}>Reject</button>
                    </td>
                  </tr>
                ))}                </tbody>
              </table>
            </div>
          )}

          

          
        </main>

        {showProfileModal && (
  <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
    <div className="bg-white p-8 rounded-md max-w-3xl">
      <h1 className="text-blue-950 font-extrabold text-center mb-6">My Profile</h1>
      <img
          src={`data:image/jpeg;base64,${userData.profilePic}`}
          alt="Profile"
          className="h-32 w-32 rounded-full mx-auto border-4 border-blue-400 mb-4"
        />
      <form className="grid grid-cols-2 gap-6">
      <div>
          <label className="block text-gray-700 font-bold mb-2">Full Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md py-2 px-4"
            value={userData.fullName}
            onChange={(e) => setUserData({...userData, fullName: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Bio</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md py-2 px-4"
            value={userData.bio}
            onChange={(e) => setUserData({...userData, bio: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Experience</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md py-2 px-4"
            value={userData.yearsOfExp}
            onChange={(e) => setUserData({...userData, yearsOfExp: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Address</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md py-2 px-4"
            value={userData.address}
            onChange={(e) => setUserData({...userData, address: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Monthly Fee</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md py-2 px-4"
            value={userData.monthlyFee}
            onChange={(e) => setUserData({...userData, monthlyFee: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Subject</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md py-2 px-4"
            value={userData.subject}
            onChange={(e) => setUserData({...userData, subject: e.target.value})}
          />
        </div>
        {/* Add other user information fields here */}
        <div className="col-span-2 flex justify-center">
        <button
  type="button" // Add this line to specify that it's not a submit button
  className="bg-blue-500 text-white px-6 py-3 rounded-md"
  onClick={updateProfile}
>
  Update Profile
</button>
        </div>
      </form>
      <button className="absolute top-6 right-6 text-red-800 hover:text-gray-800" onClick={toggleProfileModal}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
)}





        {/* Confirm modal */}
        {showConfirmModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p className="text-lg font-semibold">Confirm Acceptance</p>
            <p>Are you sure you want to accept this booking?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => handleAcceptBooking(selectedBookingId!)}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}



{showRejectConfirmModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p className="text-lg font-semibold">Confirm Rejection</p>
            <p>Are you sure you want to reject this booking?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => handleRejectBooking(selectedBookingId!)}
              >
                Reject
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => setShowRejectConfirmModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      
      </body>
    );
};

export default TutorDash;

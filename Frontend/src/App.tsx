import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { default as CreateFutsalForm, default as SignupPageForm } from './pages/SignupPage';
import BookingPage from './pages/bookingPage';
import Form from './pages/loginForm';
import LoginPage from './pages/loginTest';
import SignupPage from './pages/signupredesign';
import TutorDash from './pages/tutorDash';
import TutorDetails from './pages/tutorDetails';

// import ExampleV3 from './Pages/test';

function App() {
  return (
    
    <Router>
      <div>
        <Routes>

          <Route path="/login" element={<Form />} />
          <Route path="" element={<Home />} />
          <Route path="/tutor-login" element={<LoginPage />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/signup" element={<RegisterPage />} />  */}
          <Route path="/register" element={<SignupPageForm />} />
          <Route path="/tutorDash" element={<TutorDash />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/trysignup" element={<CreateFutsalForm />} />

          {/* <Route path="/tutorDetail" element={<TutorDetails />} /> */}

          <Route path="/tutorDetail/:id" element={<TutorDetails />} />
          <Route path="/booking-form/:userId" element={<BookingPage/>} />


     
          {/* <Route path="/booking-form/:userId" element={<BookingForm/>} /> */}

          {/* <Route path="/test" element={<ExampleV3/>} /> */}
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
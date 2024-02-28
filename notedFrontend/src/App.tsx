import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/loginForm';
import LoginPage from './pages/loginTest';
import RegisterPage from './pages/signup';
import TutorDash from './pages/tutorDash';

// import ExampleV3 from './Pages/test';

function App() {
  return (
    
    <Router>
      <div>
        <Routes>

          <Route path="/login" element={<Form />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login-new" element={<LoginPage />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/signup" element={<RegisterPage />} />  */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tutor" element={<TutorDash />} />

          {/* <Route path="/test" element={<ExampleV3/>} /> */}
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
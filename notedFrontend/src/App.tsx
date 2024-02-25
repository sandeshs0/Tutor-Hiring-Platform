import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Form from './pages/loginForm';
import LoginPage from './pages/loginTest';
import RegisterPage from './pages/register';

// import ExampleV3 from './Pages/test';

function App() {
  return (
    
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Form />} />
          <Route path="/login-new" element={<LoginPage />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
         
          <Route path="/register" element={<RegisterPage />} /> 
          {/* <Route path="/test" element={<ExampleV3/>} /> */}
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
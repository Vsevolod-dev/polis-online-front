import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Profile from './components/Profile';

function App() {
  const [{token}] = useCookies()

  return (
    <div className="App">
      <BrowserRouter>
      { token 
        ? <Routes>
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/profile" replace />} />
          </Routes>
        : <Routes>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
  }
    </BrowserRouter>
    </div>
  );
}

export default App;

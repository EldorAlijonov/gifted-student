import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Home, LoginPage, ProfilPage, RegisterPage } from './pages';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {

  const { token: registerToken } = useSelector((state) => state.register);
  const { token: loginToken } = useSelector((state) => state.login);
  const navigate = useNavigate();
  useEffect(() => {
    if (registerToken && loginToken) {
      navigate("/");
    }
  }, [registerToken, loginToken, navigate]);

  return (
    <>
      {registerToken || loginToken ? (
        <Routes>
          <Route path="/">
            <Route index element={<ProfilPage />} />
          </Route>
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path='*' element={<Navigate to='/home' />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;

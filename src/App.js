import { Routes, Route } from 'react-router-dom';
import { Main, Login, Register } from './view';
import { Navbar } from "./components";
import './App.css';
import Profil from './view/profil/Profil';
import AuthService from './services/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserSuccess } from './slice/auth';

function App() {

  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const response = await AuthService.getUser()
      dispatch(loginUserSuccess(response))
    } catch (error) {
      console.log("Error");
    }
  }
  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </>
  );
}

export default App;

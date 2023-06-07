import { Routes, Route } from 'react-router-dom';
import { Main, Login, Register } from './view';
import { Navbar } from "./components";
import './App.css';
import Profil from './view/profil/Profil';
import { loginUserSuccess } from './slice/auth';
import { useDispatch } from 'react-redux';
import AuthService from './services/auth';
import { useEffect } from 'react';
import { getItem } from './helpers/persistance-storage';

function App() {

  // const dispatch = useDispatch()

  // const getUser = async () => {
  //   try {
  //     const response = await AuthService.getUser()
  //     dispatch(loginUserSuccess(response.user))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   const token = getItem('token')
  //   if (token) {
  //     getUser()
  //   }
  // }, [])



  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;

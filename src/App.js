import { Routes, Route } from 'react-router-dom';
import { Main, Login, Register } from './view';
import { Navbar } from "./components";
import './App.css';
import Profil from './view/profil/Profil';
import AuthService from './services/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserSuccess } from './slice/auth';
import ProfilInfoAdd from './view/pfrofil-info-add/ProfilInfoAdd';
import Article from './view/article/Article';
import StudentWins from './view/student-wins/StudentWins';

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
        <Route path="/profil_info_add" element={<ProfilInfoAdd />} />
        <Route path="/article_add" element={<Article />} />
        <Route path="/student_wins" element={<StudentWins />} />
      </Routes>
    </>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import { Main, Login, Register } from './view';
import { Navbar } from "./components";
import './App.css';
import Profil from './view/profil/Profil';

function App() {
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

import { Routes, Route } from 'react-router-dom';
import { Main, Login, Register } from './view';
import { Navbar } from "./components";
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;

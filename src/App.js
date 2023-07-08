import { Routes, Route } from "react-router-dom";
import { Menu, Navbar } from "./components";
import { useSelector } from "react-redux";
import {
  Main,
  Login,
  Register,
  StudentWins,
  ProfilInfoAdd,
  Article,
  Profil,
} from "./view";
import "./App.css";
import ProfilEdit from "./view/profil/PeofilEdit";

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />

      {token ? (
        <div className="container profil-div">
          <div className="main-body">
            <div className="row gutters-sm">
              <Menu />
              <div className="col-md-8">
                <Routes>
                  <Route path="/profil" element={<Profil />} />
                  <Route path="/profil_info_add" element={<ProfilInfoAdd />} />
                  <Route path="/article_add" element={<Article />} />
                  <Route path="/student_wins" element={<StudentWins />} />
                  <Route path="/profil_edit/:id" element={<ProfilEdit/>}/>
                </Routes>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
}

export default App;

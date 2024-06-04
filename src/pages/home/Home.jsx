import { Navbar } from "../../components";
import "./home.scss";
const Home = () => {
    return (

        <div className="home">
            <Navbar />
            <div className="home-container">
                <h1>Home page</h1>
            </div>
        </div>
    );
}

export default Home;
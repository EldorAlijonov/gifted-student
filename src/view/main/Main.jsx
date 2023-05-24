import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
    return (
        <div className="text-center pt-5">
            <Link className="btn btn-primary px-4" to={"/register"}>Profil yaratish</Link>
        </div>
    )
}

export default Main;
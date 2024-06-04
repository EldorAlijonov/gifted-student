import { MdOutlineSettings } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { GrArticle } from "react-icons/gr";
import { GrAchievement } from "react-icons/gr";
export const item = [
    {
        to: "/",
        icon: <FaUserCircle className="icon" />,
        title: "Profil"
    },
    {
        to: "/articl",
        icon: <GrArticle className="icon" />,
        title: "Maqolalar"
    },
    {
        to: "/wins",
        icon: <GrAchievement className="icon" />,
        title: "Yutuqlar"
    },
    {
        to: "/setting",
        icon: <MdOutlineSettings className="icon" />,
        title: "Settings"
    }
]
import { Link } from "react-router-dom";
import style from "./NavBar.module.css"
import homeLogo from "../../utils/homeLogo.png"
import createLogo from "../../utils/logoHuella.png"

const NavBar = () => {
    
    return(
        <div className = {style.mainContainer}>
            <Link to = "/home">
                <div className={style.homeContainer}>
                    <img src={homeLogo}/>
                    <h3>Go to Home</h3>
                </div>
            </Link>
            <h2>Dog's breeds Portal</h2>
            <Link to = "/create">
                <div className={style.createContainer}>
                    <h3>Create Breed</h3>
                    <img src={createLogo}/>
                </div>
            </Link>
        </div>
    )
}

export default NavBar;
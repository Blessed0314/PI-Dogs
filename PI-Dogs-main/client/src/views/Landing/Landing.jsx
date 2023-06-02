import imageUrl from "../../utils/marco.png";
import style from "./Landing.module.css";
import luto from "../../utils/luto.png";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
      <div className={style.container}>
        <div className={style.imageContainer}>
          <img src={imageUrl} alt="noah" />
        </div>
        <div className={style.contentContainer}>
            <h1>Dog's breeds Portal, Welcome</h1>
            <img src={luto}/>
            <h4 className={style.paragraph}>
            Before I begin, I want to dedicate this work to Noah, my little angel 
            who left this world the day after the kickoff and pay tribute to all 
            the mascots that today not only represent a company, but an inseparable 
            friend or son, who always It is present in the best moments of our lives 
            and in the most difficult ones.
            </h4>
            <div className={style.buttonContainer}>
               <Link to="/home">
                    <button className={style.buttonStyle}></button>
               </Link> 
            </div>
        </div>
      </div>
    );
};
export default Landing;
import style from "./Card.module.css"
import { Link } from "react-router-dom";

const Card = ({ id,name,image,weight,temperaments }) => {
    return(
        <Link to= {`/detail/${id}`}>
            <div className={style.card}>
                <h3>Name: {name}</h3>
                <img  src={image} alt="" /> 
                <p>Weight: {`min ${weight.min}Kg, max ${weight.max}Kg`}</p>
                <p>Temperaments: {temperaments}</p>
            </div>
        </Link>
    )
}
export default Card;
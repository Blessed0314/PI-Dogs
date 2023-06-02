import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanFilterState, getDogByID } from "../../redux/actions";
import style from "./Detail.module.css"
import { Link } from "react-router-dom";


const Detail = () =>{

    const { id } = useParams(); //* Me traigo de los params el id 

    const dispatch = useDispatch(); //* hago dispatch a la acción para traer el perro al estado
    useEffect(() => {
        dispatch(getDogByID(id));
        return ()=> {
            dispatch(cleanFilterState())
        }
    },[id])
        
    const dog = useSelector(state => state.filterDog); //* Seleccciono el estado global donde esta el perro
    
    return (
        <div className={style.container}>
          {dog ? (
            <>
              <div className={style.detailContainer}>
                <div className={style.detailText}>
                  <h1>Name: {dog.name}</h1>
                  <p>Height: {dog.height}</p>
                  <p>Weight: {dog.weight && `min ${dog.weight.min}Kg, max ${dog.weight.max}Kg`}</p>
                  <p>Life span: {dog.lifeSpan}</p>
                  <p>Temperaments: {dog.temperament}</p>
                  <div className={style.buttonContainer}>
                    <button className={style.buttonStyle}>
                      <Link to="/home">Volver</Link>
                    </button>
                  </div>
                </div>
                <div className={style.detailImage}>
                  <img src={dog.image} alt="" />
                </div>
              </div>
            </>
          ):(
          <>
            <div className={style.detailLoading}>
              <img src="https://www.gifsanimados.org/data/media/202/perro-imagen-animada-0727.gif"/>
              <h2>Loading...</h2>
            </div>
          </>
          )}
        </div>
        
    );
};

export default Detail;
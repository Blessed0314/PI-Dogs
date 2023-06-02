import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import Pagination from "../Pagination/Pagination";
import { useFilters }  from './functions'

const CardsContainer = () => {

  //* Se trae el estado de filteredDogs de redux para mostrar los perros
  const dogs = useSelector((state) => state.filteredDogs);
  //* Se trae y se ordena el estado de temperaments de redux para el search por temperamentos 
  const temperamentData = useSelector((state) => state.temperaments);
  const temperaments = temperamentData && temperamentData.map((temp)=>temp.name)
  temperaments && temperaments.sort();  

  //* Se traen todas las funciones de los filtros 
  const { filterName, filterBy, orderBy } = useFilters()

  //? ============================================================= Paginado =============================================================
  //*Se crea un estado para el paginado
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const indexOfLastDog = currentPage * perPage;
  const indexOfFirstDog = indexOfLastDog - perPage;
  const currentDogs = dogs && dogs.slice(indexOfFirstDog, indexOfLastDog);

  const totalPages = Math.ceil((dogs && dogs.length) / perPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //? ============================================================ SearchBar =============================================================
  //* Se crea un estado para los perros filtrados por name
  const [dogsByName, setDogsByName] = useState("");

  const filterNameHandler = (event) => {
    const queryDogs = event.target.value
    setDogsByName(queryDogs)
  }

  const handleButtonSearch = () => {
    valueOrigin.current.value = "both"
    valueTemp.current.value = "all"
    valueType.current.value = "alpha"
    valueOrder.current.value = "asc"
    setCurrentPage(1);
    filterName(dogsByName);
  }
  //? ============================================================= Filter ===============================================================
  const valueOrigin = useRef(null);
  const valueTemp = useRef(null);

  const handleFilter = () => {
    setCurrentPage(1);
    const origin = valueOrigin.current.value;
    const temp = valueTemp.current.value;
    valueType.current.value = "alpha"
    valueOrder.current.value = "asc"
    filterBy(origin,temp);
  }
  //? ============================================================= Order ================================================================
  //*Se usa el hook useRef para poder llamar el handler con los values de dos select
  const valueType = useRef(null);
  const valueOrder = useRef(null);

  const handleOrder = () => {
    setCurrentPage(1);
    const type = valueType.current.value;
    const order = valueOrder.current.value
    orderBy( type,order );
  }

  //? ============================================================= Render ===============================================================
  return (
    <div className={style.container}>
      <div className={style.searchContainer}>
        <h4>Search by:</h4>
        <input type="text" placeholder="Search by name or letter..." onChange={filterNameHandler}/>
        <button type="submit" onClick={()=> handleButtonSearch()} className={style.buttonStyle} >Search</button>
        <h4>Sort by:</h4>
        <select ref={valueOrigin} onChange={handleFilter}>
          <option value="both">Both</option>
          <option value="bdd">BD</option>
          <option value="api">API</option>
        </select>
        <select ref={valueTemp} onChange={handleFilter}>
          <option value="all">All temperaments</option>
          {temperaments && temperaments.map((temperament, index) =>(
            <option key={index} value={temperament}>{temperament}</option>
          ))}
          <option value="Not register">Not register</option>
        </select>
        <h4>Order by:</h4>
        <select ref={valueType} onChange={handleOrder}>
          <option value="alpha">Alphabetical</option>
          <option value="weight">Weight</option>         
        </select>
        <select  ref={valueOrder} onChange={handleOrder}>
          <option value="asc">Ascending</option>
          <option value="des">Descending</option>
        </select>
      </div>
      <div className={style.cardContainer}>
        {currentDogs ? (currentDogs.map((dog) => (
          <div key={dog.id} className={style.card}>
            <Card
              id={dog.id}
              name={dog.name}
              image={dog.image}
              weight={dog.weight}
              height={dog.height}
              lifeSpan={dog.lifeSpan}
              temperaments={dog.temperament}
            />
          </div>
        ))
        ):(
          <div className={style.loadingContainer}>
            <div className={style.detailLoading}>
                <img src="https://www.gifsanimados.org/data/media/202/perro-imagen-animada-0727.gif"/>
                <h2>Loading...</h2>
            </div>
          </div>
        )}
      </div>
      <div className={style.paginationContainer}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CardsContainer;
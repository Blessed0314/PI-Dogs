import { useDispatch } from "react-redux";
import { getDogByName, filterDogs, orderDogs } from "../../redux/actions";



export const useFilters = () => {
    const dispatch = useDispatch();
    
    const filterName = (dogByname) => {
        dispatch(getDogByName(dogByname));   
    }

    const filterBy= (origin, temp) => {
        dispatch(filterDogs(origin, temp));    
    }

    const orderBy = (type, order) => { 
        dispatch(orderDogs(type, order));
    }

    return {filterName, filterBy, orderBy}    
}



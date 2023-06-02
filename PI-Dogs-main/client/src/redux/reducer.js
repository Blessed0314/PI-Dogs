import { CLEAN_FILTER_STATE, FILTER_DOGS, GET_DOGS, GET_DOG_BY_ID, GET_DOG_BY_NAME, GET_TEMPERAMENTS, ORDER_DOGS } from "./actions";

const initialState = {
    dogs: [], temperaments: [], filterDog: {}, filteredDogs:[], searchDogs:[]
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_DOGS:
            return {...state, dogs:action.payload, searchDogs: action.payload, filteredDogs: action.payload };

        case GET_DOG_BY_ID:
            return { filterDog:action.payload };

        case GET_DOG_BY_NAME:
            return {...state, searchDogs:action.payload, filteredDogs:action.payload};

        case FILTER_DOGS:
            if (action.payload[0] !== 'both' && action.payload[1] !== 'all'){
               const filterDogs = state.searchDogs.filter(dog => dog.origin === action.payload[0] && dog.temperament.split(", ").includes(action.payload[1]))
               return {...state, filteredDogs:filterDogs};
            }
            if (action.payload[0] === 'both' && action.payload[1] !== 'all'){
                const filterDogs = state.searchDogs.filter(dog => dog.temperament.split(", ").includes(action.payload[1]));
                return {...state, filteredDogs:filterDogs};
            }
            if (action.payload[0] !== 'both' && action.payload[1] === 'all'){
                const filterDogs = state.searchDogs.filter(dog => dog.origin === action.payload[0])
                return {...state, filteredDogs:filterDogs};
            }
            if (action.payload[0] === 'both' && action.payload[1] === 'all'){
                const filterDogs = state.searchDogs
                return {...state, filteredDogs:filterDogs};
            }
            break
    
        case GET_TEMPERAMENTS:
            return {...state, temperaments:action.payload};

        case ORDER_DOGS:
            if(action.payload[0] === 'weight' && action.payload[1] === 'asc'){
                const sortedDogs = [...state.filteredDogs].sort(function (prevDog, currDog){
                    const weightPrevDog = (parseInt(prevDog.weight.min) + parseInt(prevDog.weight.max)) / 2;
                    const weightCurrDog = (parseInt(currDog.weight.min) + parseInt(currDog.weight.max)) / 2;
                    if (weightPrevDog < weightCurrDog) return -1;
                    if (weightPrevDog > weightCurrDog) return 1;
                    return 0;
                });
                return {...state, filteredDogs:sortedDogs};
            }
            if(action.payload[0] === 'alpha' && action.payload[1] === 'asc'){
                const sortedDogs = [...state.filteredDogs].sort(function (prevDog, currDog){
                    const namePrevDog = prevDog.name.toUpperCase();
                    const nameCurrDog = currDog.name.toUpperCase();
                    if (namePrevDog < nameCurrDog) return -1;
                    if (namePrevDog > nameCurrDog) return 1;
                    return 0;
                });
                return {...state, filteredDogs:sortedDogs}
            }
            if(action.payload[0] === 'weight' && action.payload[1] === 'des'){
                const sortedDogs = [...state.filteredDogs].sort(function (prevDog, currDog){
                    const weightPrevDog = (parseInt(prevDog.weight.min) + parseInt(prevDog.weight.max)) / 2;
                    const weightCurrDog = (parseInt(currDog.weight.min) + parseInt(currDog.weight.max)) / 2;
                    if (weightPrevDog > weightCurrDog) return -1;
                    if (weightPrevDog < weightCurrDog) return 1;
                    return 0;
                });
                return {...state, filteredDogs:sortedDogs};
            }
            if(action.payload[0] === 'alpha' && action.payload[1] === 'des'){
                const sortedDogs = [...state.filteredDogs].sort(function (prevDog, currDog){
                    const namePrevDog = prevDog.name.toUpperCase();
                    const nameCurrDog = currDog.name.toUpperCase();
                    if (namePrevDog > nameCurrDog) return -1;
                    if (namePrevDog < nameCurrDog) return 1;
                    return 0;
                });
                return {...state, filteredDogs:sortedDogs}
            }
            break

        case CLEAN_FILTER_STATE:
            return {filterDogs: {}}
        default:
            return {...state};
    }
};

export default rootReducer;
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDogs, getTemperaments } from "../../redux/actions";

const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDogs());
    },[]);

    useEffect (() => {
        dispatch(getTemperaments())
    },[]);
    
    return (
        <>
            <CardsContainer />
        </>
    )
    
}

export default Home;
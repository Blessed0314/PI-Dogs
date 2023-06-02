import style from './Error.module.css';

const Error = () => {
    return (
        <>
            <div className={style.errorContainer}>
                <img src="https://www.ahiva.info/Gifs-Animados/Animales/Huellas/huella-06.gif"/>
                <h1>404 Page Not Found</h1>
            </div>
        </>
    );
}

export default Error;
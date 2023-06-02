import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../redux/actions";
import style from "./Form.module.css"
import axios from "axios";

const Form = () => {

    //? ====================================================== Select de Temperamentos ======================================================
    const temperamentData = useSelector((state) => state.temperaments); //* Traemos del estado global los temperamentos

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTemperaments());
    }, []);

    const temperaments = temperamentData && temperamentData.map((temp)=>temp.name); //* Del array de objetos que nos llega, creamos un array
    temperaments && temperaments.sort();                                            //* ordenado con solo los temperamentos

    //*Estas dos líneas utilizan el hook de estado useState para declarar dos variables de estado: searchTerm y selectedOptions. 
    //*searchTerm representa el término de búsqueda en el campo de búsqueda, mientras que selectedOptions contiene las opciones seleccionadas. 
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    //* Esta función handleSearchChange se ejecuta cuando se produce un cambio en el campo de búsqueda. 
    //* Actualiza el estado searchTerm con el valor ingresado en el campo de búsqueda.
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    //* Esta función handleOptionChange se ejecuta cuando se selecciona o deselecciona una opción en el campo de búsqueda.
    const handleOptionClick = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    //* Esta función filtra en el array de temperamentos la busqueda por letras iniciales
    const filteredTemperaments = temperaments && temperaments.filter((temperament) =>
        temperament.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    //* Este hook es para controlar los cambios en el array de temperaments del form
    useEffect(() => {
        setForm((prevForm) => ({
          ...prevForm,
          temperaments: selectedOptions
        }));
      }, [selectedOptions]);

    //? ======================================== Estados para el form y la validación de los inputs ========================================
    
    //* Se crea un estado para el form
    const [form, setForm] = useState({
        image: '',
        name: '',
        weight: {min:'', max: ''},
        height: {min:'', max: ''},
        lifeSpan: {min:'', max: ''},
        temperaments: []
    });

    //* Se crea un estado para los errores
    const [errors, setErrors] = useState({
        image: '',
        name: '',
        weight: '',
        height: '',
        lifeSpan: '',
        temperaments: '',
    });

    //* Se crea un estado para almacenar los perros que se creen mediante el form
    const [dogs, setDogs] = useState([]);


    const validate = (form) =>{
        let newErrors = {};
        const exist = dogs && dogs.some(dog => dog.name.trim().toLowerCase() === form.name.trim().toLowerCase())

        //* Validación del name. 
        if(!form.name) newErrors = ({...newErrors, name: "Por favor llena el campo name"});
        else if (!/^[a-zA-Z\s]+$/.test(form.name)) newErrors = ({...newErrors, name: "El name solo debe tener letras y espacios"});
        else if (form.name === "") newErrors = ({...newErrors, name: "El name esta vacio"});
        else if (exist) newErrors = ({...newErrors, name: "El perro ya existe en la base de datos"});
        else newErrors = ({...newErrors, name: ""});
   
        //* Validación de la image.
        if(!form.image) newErrors = ({...newErrors, image: "Por favor llena el campo image"});
        else if (!/^(http|https):\/\/[\w\-]+(\.[\w\-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?\.(jpg|gif)$/.test(form.image)) 
             newErrors = ({...newErrors, image: "Image debe ser una url que lleve a una imagen en formato gif o jpg"});
        else newErrors = ({...newErrors, image: ""});

        //* Validación de height, weight, lifeSpan
        if(!form.height.min || !form.height.max) newErrors = ({...newErrors, height: "Por favor llena los campos del height"});
        else if (!(/^[0-9]+$/.test(form.height.min)&&/^[0-9]+$/.test(form.height.max))) newErrors = ({...newErrors, height: "Estos campos deben ser numericos"});
        else newErrors = ({...newErrors, height: ""});

        if(!form.weight.min || !form.weight.max) newErrors = ({...newErrors, weight: "Por favor llena los campos del weight"});
        else if (!(/^[0-9]+$/.test(form.weight.min)&&/^[0-9]+$/.test(form.weight.max))) newErrors = ({...newErrors, weight: "Estos campos deben ser numericos"});
        else newErrors = ({...newErrors, weight: ""});

        if(!form.lifeSpan.min || !form.lifeSpan.max) newErrors = ({...newErrors, lifeSpan: "Por favor llena los campos del lifeSpan"});
        else if (!(/^[0-9]+$/.test(form.lifeSpan.min)&&/^[0-9]+$/.test(form.lifeSpan.max))) newErrors = ({...newErrors, lifeSpan: "Estos campos deben ser numericos"});
        else newErrors = ({...newErrors, lifeSpan: ""});

        /*if(form.temperaments.length === 0) newErrors = ({...newErrors, temperaments: "Debes seleccionar al menos 1 temperamento"});
        else ({...newErrors, temperaments: "Debes seleccionar al menos 1 temperamento"});*/

        setErrors(newErrors);
    }

    //* Se valida que el campo de los temperamentos tenga al menos uno de ellos seleccionado, se realizo a parte ya que por el estado
    //* de errors se demora en renderizar el mensaje al pasar por dos estados (temperamentos y errors).
    const validateTemps = (temperaments) =>{
        let error = "";
        if (temperaments.length === 0) error = "Debes agregar al menos un temperamento"
        return error;
    }

    //* Esta función cambia los estados de errors y del form dependiendo de su contenido 
    const changeHandler = (event) => {
        const property = event.target.name; //* Se captura del form el atributo a ser cambiado en el estado
        let value = event.target.value;   //* Se captura del form el value que se le asignará al atributo capturado

        //* Si la propiedad es 'weight', 'height' o 'lifeSpan'
        //* se asigna un objeto con las propiedades 'min' y 'max'
        if (property === "weight" || property === "height" || property === "lifeSpan"){
            validate({...form,[property]: {...form[property],[event.target.id]: value}});
            setForm({...form,[property]: {...form[property],[event.target.id]: value}});
        }else{
            //* Si no es una de las propiedades anteriores, se asigna el valor directamente
            validate({...form,[property]: value});
            setForm({...form,[property]: value});
        }
    };

    //? ============================================================= Submit =============================================================
    //* Función para validar que todos los campos del form no tengan errores.
    const isFormValid = (errors, selectedOptions) =>{
        if (errors.name || errors.image || errors.weight.min || errors.weight.max || 
            errors.height.min || errors.height.max || errors.lifeSpan.min || errors.lifeSpan.max ||
            selectedOptions.length === 0)
            return false;
        else return true;
    }

    //* Handler para enviar la información a la base de datos, si hay un error muestra el mensaje que manda el servidor
    const submitHandler = (event) => {
        event.preventDefault();
        if (isFormValid(errors, selectedOptions)){
            axios.post("http://localhost:3001/dogs",form)
            .then(() => {
                alert("La raza se ha creado con exito")
                setDogs([...dogs,form])
                setForm({...form, name:"", image:"", 
                        weight: {min:'', max: ''}, 
                        height: {min:'', max: ''}, 
                        lifeSpan: {min:'', max: ''}, 
                        temperaments: []});
                        setSelectedOptions([]);
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) 
                    alert(`Ocurrió un error. Status 400: Bad Request\nMensaje: ${error.response.data.error}`);
                else 
                    alert("Ocurrió un error. Status 404: Bad Request");
            })
            
        } else alert("La información suministrada no es correcta, revisa los campos en rojo")           
    }
    
    //? =========================================================== Formulario ===========================================================

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={submitHandler}>
                <h2 className={style.fontStyle}>Create a new Breed</h2>
                <div>
                    <label>Name: </label>
                    <input type = "text" value = {form.name} onChange={changeHandler} name="name" required />
                </div >
                <span className={style.errorMessage}>{errors.name}</span>
                <div className={style.labelStyle}>
                    <label>Image: </label>
                    <input type = "text" value = {form.image.trim()} onChange={changeHandler} name="image" required/>
                </div>
                <span className={style.errorMessage}>{errors.image}</span>
                <div>
                    <h4>Weight in Kg:</h4>
                    <label>Min </label>
                    <input type = "number" value = {form.weight.min} onChange={changeHandler} name = "weight" id = "min" required />
                    <label> Max </label>
                    <input type = "number" value = {form.weight.max} onChange={changeHandler} name = "weight" id = "max" required/>
                </div>
                <span className={style.errorMessage}>{errors.weight}</span>
                <div>
                    <h4>Height in cm:</h4>
                    <label>Min </label>
                    <input type = "number" value = {form.height.min} onChange={changeHandler} name = "height" id = "min" required/>
                    <label> Max </label>
                    <input type = "number" value = {form.height.max} onChange={changeHandler} name = "height" id = "max" required/>
                </div>
                <span className={style.errorMessage}>{errors.height}</span>
                <div>
                    <h4>Life span in years:</h4>
                    <label>Min </label>
                    <input type = "number" value = {form.lifeSpan.min} onChange={changeHandler} name = "lifeSpan" id = "min" required/>
                    <label> Max </label>
                    <input type = "number" value = {form.lifeSpan.max} onChange={changeHandler} name = "lifeSpan" id = "max" required/>
                </div>
                <span className={style.errorMessage}>{errors.lifeSpan}</span>
                <div>
                    <h4>Temperaments:</h4>
                    <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search Temperaments"/>
                    <ul style={{ maxHeight: '75px', overflowY: 'auto', color: 'gray', textShadow: 'white' }}>
                        {filteredTemperaments && filteredTemperaments.map((temperament) => (
                            <li
                                key={temperament}
                                onClick={() => handleOptionClick(temperament)}
                                style={{
                                    cursor: 'pointer',
                                    listStyleType: 'none',
                                    fontWeight: selectedOptions.includes(temperament) ? 'bold' : 'normal',
                                    color: selectedOptions.includes(temperament) ? '#E74C3C' : '#E5E7E9',
                                    textShadow: selectedOptions.includes(temperament) ? '1px 1px 1px white' : '1px 1px 1px #943126',
                                }}
                            >{temperament}
                            </li>
                        ))}
                    </ul>
                </div>
                <h4>Opciones seleccionadas:</h4>
                <div>
                    <div className = {style.selectedOptionsContainer}>                  
                        <div>{selectedOptions.join(', ')}</div>
                    </div>
                    <span className={style.errorMessage}>{validateTemps(selectedOptions)}</span>
                </div>
                <div className={style.buttonContainer}>
                    <button type="submit" className={style.buttonStyle}>CREATE</button>        
                </div>                       
            </form>
            <>
                <img src = "https://cdn.pixabay.com/animation/2022/10/06/13/44/13-44-02-515_512.gif" style={{ width: '200px', height: '200px' }}/>
                <div className={style.detail}>
                    {form.name === "" || form.image === "" || form.height.min === "" || form.height.max === "" || 
                    form.weight.min === "" || form.weight.max === "" || form.lifeSpan.min === "" || form.lifeSpan.max === "" || 
                    form.temperaments.length === 0 ? (
                        <div className={style.loadingContainer}>
                            <h4>Loading...</h4>
                            <img src="https://i.pinimg.com/originals/fe/59/59/fe595916348f17c1fa6137a325860e5e.gif" alt = "Loading..."/>
                        </div>
                    ):(
                        <>
                            <h1>Name: {form.name}</h1>
                            <img src={form.image} alt=""/>
                            <p>Height: {`min: ${form.height.min}cm max: ${form.height.max}cm`}</p>
                            <p>Weight: {`min: ${form.weight.min}Kg max: ${form.weight.max}Kg`}</p>
                            <p>Life span: {`min: ${form.lifeSpan.min} years max: ${form.lifeSpan.max} years`}</p>
                            <p>Temperaments: {form.temperaments.join(", ")}</p>
                        </>
                    )}
                </div>
            </>
        </div>
        
    );
};

export default Form;
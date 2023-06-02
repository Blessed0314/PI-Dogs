import {Home, Landing, Detail, Form, Error} from "./views";
import { Route, useLocation, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import styles from "./globalStyles.css";

function App() {
  const location = useLocation();
  console.log(location)
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/create" component={Form} />
        <Route exact path="/home" component={Home} />
        <Route path="/detail/:id" component={Detail} />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default App;

//! <Route exact path = "/" component={Landing} />  Esta forma es para agregar un componente sin la posiblidad de pasar parametros
//* <Route path = "/home" render={() => <Home />} /> Esta forma es para agregar componentes con la posibilidad de pasar parametros
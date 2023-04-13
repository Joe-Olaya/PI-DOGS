import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import {LandingPage, Home, DogDetails, FormAddDog} from "./components"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LandingPage/>
          </Route>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route exact path="/dog-detail/:id">
            <DogDetails />
          </Route>
          <Route exact path="/dog">
            <FormAddDog />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

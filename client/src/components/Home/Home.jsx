import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllDogs,
  getTemperaments,
  FilterByTemperament,
  OrderByName,
  OrderByWeight,
  filterBySource
} from "../../redux/actions";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar"

import style from "../Home/Home.module.css"

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.dogs); //valores del estado global de redux que requiero
  const allTemperaments = useSelector(state => state.temperaments);

  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;
  const lastIndex = currentPage * dogsPerPage; 
  const firstIndex = lastIndex - dogsPerPage;
  const currentDogs = allDogs.slice(firstIndex, lastIndex);//elementos a renderizar en la pagina, segun el valor de paginado

  console.log(allDogs)
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  // eslint-disable-next-line
  const [orden, setOrden] = useState("");

  useEffect(() => {
    //acciones a depachar luego de montar el componente
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleFilterByTemperament = (e) => {
    e.preventDefault();    
    dispatch(FilterByTemperament(e.target.value));
  };

  const handleOrderByName = (e) => {
    e.preventDefault();
    dispatch(OrderByName(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleOrderByWeight = (e) => {
    e.preventDefault();
    dispatch(OrderByWeight(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleOrderBySource = (e) => {
    e.preventDefault();
    dispatch(filterBySource(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  };

  return (
    <>
      <header className={`${style.header}`}>
        <div className={`${style.header_container_left}`}>

          <Link to="/">
            <div className={`${style.logo}`}>Caninofilos</div> 
          </Link>
          
          <div className={`${style.header_left}`}>

            <SearchBar />

            <div className={`${style.container_filters}`}>
              <select onChange={handleOrderByName}>
                <option disabled selected defaultValue>
                  Alphabetical order
                </option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>

              <select onChange={handleOrderByWeight}>
                <option disabled selected defaultValue>
                  Filter by weight
                </option>
                <option value="max_weight">Max</option>
                <option value="min_weight">Min</option>
              </select>

              <select onChange={handleFilterByTemperament}>
                  <option disabled selected defaultValue>Temperaments</option>
                  <option value="Todos">All</option>
                  {
                    allTemperaments?.map(temp => (
                        <option value={temp.name}  key={temp.id}>{temp.name}</option>
                    ))
                  }
              </select>

              <select onChange={handleOrderBySource}>
                <option disabled selected defaultValue>
                  Filter by source
                </option>
                <option value="Todos">All</option>
                <option value="api">Api</option>
                <option value="db">DB</option>
              </select>
            </div>
            
          </div>
        </div>
        {/* boton para agregar nuevos perros */}
        <div className={`${style.header_right}`}>
          <Link to="/dog">
            <button className={`${style.button_add_dog}`}>CREATE DOG</button>
          </Link>
        </div>
      </header>

      <hr />

    <div className={style.main_container}>
      <div className={style.container_cards}>
        {currentDogs?.map((dog) => {//validacion que existan los datos
          return(
            <div className={`${style.container_card}`} key={dog.id}>
              <Link to={"/dog-detail/"+dog.id}>
                {
                  <Card key={dog.id}
                  image={dog.image}
                  name={dog.name} 
                  temperaments={dog.temperaments[0].name ? dog.temperaments.map(el => el.name) : dog.temperaments}/>
                  //si temperaments viene en un formato distinto desde la BD
                }
              </Link>
            </div>      
          )
        })}
      </div>
      <div className={`${style.pagination}`}>
        <Paginate dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado}/> {/*el valor de la funcion de paginado aumenta segun el bucle for en el componente Paginate*/}
      </div>
    </div>
    </>
  );
}

export default Home;

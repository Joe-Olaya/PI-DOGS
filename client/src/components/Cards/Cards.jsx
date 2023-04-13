import { Link } from "react-router-dom";
import Paginate from "../Paginate/Paginate";
import Card from "../Card/Card";


export default function Cards({ image, name, temperaments }) {

  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <div className={style.main_container}>
      <div className={style.container_cards}>
        {currentDogs?.map((el) => {//validacion que existan los datos
          return(
            <div className={`${style.container_card}`} key={el.id}>
              <Link to={"/dog-detail/"+el.id}>
                {
                  <Card key={el.id} image={el.image} name={el.name} temperaments={el.temperaments[0].name ? el.temperaments.map(el => el.name) : el.temperaments}/>
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
  );
}

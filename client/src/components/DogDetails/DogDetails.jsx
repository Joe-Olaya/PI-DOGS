import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { showDogDetails, cleanDetail } from "../../redux/actions";
import { Link } from "react-router-dom";
import style from "../DogDetails/DogDetails.module.css";

export default function DogDetails() {
    const dispatch = useDispatch();
    let { id } = useParams();
    
    useEffect(() => {
        dispatch(showDogDetails(id));
        return () => {dispatch(cleanDetail())
        }
    }, [dispatch, id]);
    
    const details = useSelector((state) => state.details)
    console.log(details);

    let nameDog, imageDog, temperamentDog, heightDog, weightDog, lifeSpanDog;
    
    if (details) { //una vez ya se hayan traido los datos renderizalos
        nameDog = details.name;
        imageDog = details.image;
        heightDog = details.height;
        weightDog = details.weight;
        lifeSpanDog = details.life_span;
        temperamentDog = details.temperament;
    };

    

    return(
        <div className={`${style.main_container}`}>
            <Link to="/home">
                <button className={`${style.button_home}`}>Home</button>
            </Link>
            <div className={`${style.sub_container}`}>
                    <div className={`${style.container_elements}`}>

                        <div className={`${style.image_container}`}>
                            <img src={imageDog} alt={`imagen de ${nameDog}`}/>
                        </div>
                        
                        <div className={`${style.right_container}`}>
                            <h1>{nameDog}</h1>
                            <h3>{`Height: ${heightDog} CM`}</h3>
                            <h3>{`Weight: ${weightDog} KG`}</h3>
                            <h3>{`Lifespan: ${lifeSpanDog}`}</h3>
                            <div>
                                <h3>Temperaments</h3>
                                <ul className={`${style.list_container}`}>
                                    {temperamentDog?.map(t => <li key={t}>{t}</li>)}
                                </ul>
                            </div>
                        </div>   
                </div>
            </div>
        </div>
    )
}
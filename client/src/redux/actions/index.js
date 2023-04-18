import axios from "axios";

export function filterBySource(payload){
    return {
        type: "FILTER_BY_SOURCE",
        payload
    }
}

export function getAllDogs() {
    return async function (dispatch) {
        try {
            var json = await axios.get(`/dogs`, { 
            });
            return dispatch({
                type: "GET_ALL_DOGS",
                payload: json.data
            });
        } catch (error) {
            console.log(error);
        }
    }
};

export function cleanDetail(){
    return {
        type:"CLEAN_DETAIL"
    }
}

export function getTemperaments() {
  return async function (dispatch) {
      var json = await axios.get(`/temperament`); //axios.get(`${urlMyApi}/temperament`)
      return dispatch({
          type: "GET_TEMPERAMENTS",
          payload: json.data,
      });
    }  
};

export function FilterByTemperament(payload) {
    return{
        type: "GET_FILTER_TEMPERAMENTS",
        payload
    }
};

export function getBreed(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`/dogs?name=${payload}`) 
            return dispatch ({
                type: "GET_BREED",
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export function OrderByName(payload) {
    return { 
        type: "ORDER_BY_NAME",
        payload
    }
};

export function OrderByWeight(payload) {
    return { 
        type: "ORDER_BY_WEIGHT",
        payload
    }
};

export function showDogDetails(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("/dogs/"+id, { 
        });
        dispatch({
            type: "SHOW_DOG_DETAILS",
            payload: json.data
        });
        } catch (error) {
            console.log(error);
        }
    }
};

export function postDog(payload) {
    return async function () {
        const data = await axios.post("/dogs", payload); 
        return data;
    }
}
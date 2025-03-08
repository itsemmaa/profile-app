import { useReducer, useEffect } from "react";
import { initialState, homeReducer } from "../reducers/homeReducer";

function useHomePageAPI() {

    const [state, dispatch] = useReducer(homeReducer, initialState);
    const { title, search, page } = state;
      //Get titles
     useEffect(() => {
      fetch("https://web.ics.purdue.edu/~barnetem/profile-app/get-titles.php")
      .then((res) => res.json())
      .then((data) => {
       // setTitles(data.titles)
       dispatch({ type: "SET_TITLES", payload: data.titles });
      });
     }, []);

       //fetch the data from the server
       useEffect(() => {
         fetch(`https://web.ics.purdue.edu/~barnetem/profile-app/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=10`)
         .then((res) => res.json())
         .then((data) => {
         dispatch({ type: "FETCH_DATA", payload: data });
         });
       }, [title,search, page]);

       return {dispatch, state};

}

export default useHomePageAPI;
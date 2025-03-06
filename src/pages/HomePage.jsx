import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useReducer } from "react";
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";
import { initialState, homeReducer } from "../reducers/homeReducer";

const HomePage = () => {
 
  const [state, dispatch] = useReducer(homeReducer, initialState);
  const { titles, title, search, profiles, page, count } = state;

  //Get titles
 useEffect(() => {
  fetch("https://web.ics.purdue.edu/~barnetem/profile-app/get-titles.php")
  .then((res) => res.json())
  .then((data) => {
   // setTitles(data.titles)
   dispatch({ type: "SET_TITLES", payload: data.titles });
  });
 }, []);

  //Update the title on change of the dropdown menu
  const handleTitleChange = (event) => {
   dispatch({ type: "SET_TITLE", payload: event.target.value });
  };

  //Update results during search
  const handleSearchChange = (event) => {
  dispatch({ type: "SET_SEARCH", payload: event.target.value });
  };

  //fetch the data from the server
  useEffect(() => {
    fetch(`https://web.ics.purdue.edu/~barnetem/profile-app/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=10`)
    .then((res) => res.json())
    .then((data) => {
    dispatch({ type: "FETCH_DATA", payload: data });
    });
  }, [title,search, page]);

  //Clear title and search
  const handleClear = () => {
  dispatch({ type: "CLEAR_FILTER" });
  };

  const buttonStyle = {
    border: "1px solid #ccc",
  };


  return (
      <Wrapper>
        <h1>Profile App</h1>
        <div className={styles["filter-wrapper"]}>
          <div className={styles["filter--select"]}>
            <label htmlFor="title-select">Select a title: </label>
              <select id="title-select" onChange={handleTitleChange} value={title}>
                <option value="">All</option>
                {titles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                    </option>
                  ))}
              </select>
          </div>

          <div className={styles["filter-search"]}>
            <label htmlFor="search">Search by name: </label>
                <input 
                type="text" 
                id="search" 
                onChange={handleSearchChange} 
                value={search}
                />
                </div>
                
                <button onClick={handleClear} style={buttonStyle}>
                  <span className="sr-only">Reset</span>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                </div>

            <div className={styles["profile-cards"]}>
              {profiles.map((profile) => (
                <Link to={`/profile/${profile.id}`} key={profile.id}>
                <Card {...profile}/>
                </Link>
                ))}
              </div>
              { count === 0 && <p>No profiles found!</p> }
              {count > 10 && (
              <div className={styles["pagination"]}>
                <button onClick={() => dispatch({ type: "SET_PAGE", payload: page - 1 })} disabled={page === 1}>
                  <span className="sr-only">Previous</span>
                  <FontAwesomeIcon icon={faChevronLeft}/>
                </button>
                <span>{page}/{Math.ceil(count/10)}</span>
                <button onClick={() => dispatch({ type: "SET_PAGE", payload: page + 1 })} disabled={page >= Math.ceil(count/10)}>
                  <span className="sr-only">Next</span>
                  <FontAwesomeIcon icon={faChevronRight}/>
                </button>
              </div>
              )}

      </Wrapper>
  );

};

export default HomePage;

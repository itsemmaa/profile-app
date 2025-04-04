import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import { useCallback, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";
import useHomePageAPI from "../hooks/homePageAPI";
import Filters from "../components/Filters";

const HomePage = () => {
 
  const {state, dispatch} = useHomePageAPI();
  const { titles, title, search, profiles, page, count } = state;

  //Update the title on change of the dropdown menu
  const handleTitleChange = useCallback((event) => {
   dispatch({ type: "SET_TITLE", payload: event.target.value });
  }, []);

  //Update results during search
  const handleSearchChange = useCallback((event) => {
  dispatch({ type: "SET_SEARCH", payload: event.target.value });
  }, []);

  //Clear title and search
  const handleClear = useCallback(() => {
  dispatch({ type: "CLEAR_FILTER" });
  }, []);

  const titlesValue = useMemo(() => titles, [titles]);

  return (
      <Wrapper>
        <h1>Profile App</h1>

        <Filters 
          titles={titlesValue} 
          title={title} 
          search={search} 
          handleTitleChange={handleTitleChange} 
          handleSearchChange={handleSearchChange} 
          handleClear={handleClear}
        />
      

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
      <div className="chatbotButton">
        <Link to="/chatbot"><button>Chatbot</button></Link>
      </div>

      </Wrapper>
  );

};

export default HomePage;

import About from "./components/About";
import Navbar from "./components/Navbar";
import image_man from "./assets/headshot-placeholder1.jpeg";
import image_woman from "./assets/headshot-placeholder2.jpeg";
import Card from "./components/Card";
import "./App.css";
import Wrapper from "./components/Wrapper";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ProfileForm from "./components/ProfileForm";

//Profiles
const App = () => {
  const profiles =[
    {
      img: image_man,
      name: 'John Doe',
      title: 'Software Engineer',
      email: 'john@email.com'
    },
    {
      img: image_woman,
      name: 'Jane Doe',
      title: 'UX Designer',
      email: 'jane@email.com'
    },
    {
      img: image_man,
      name: 'Johnson Doe',
      title: 'Web Developer',
      email: 'johnson@email.com'
    },
    {
      img: image_woman,
      name: 'Jill Doe',
      title: 'Sales',
      email: 'jill@email.com'
    },
  ];

  //Variable to store the animation state
  const [animation, setAnimation] = useState(false);
  //Function to update the animation state
  const handleAnimation = () => {
    setAnimation(false);
  };

  //Variable to store the mode state
  const [mode, setMode] = useState("light");
  //Function to update the mode state
  const handleModeChange = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  //Get titles
  const titles = [...new Set(profiles.map((profile) => profile.title))];

  //Make "All" default filter
  const [title, setTitle] = useState("");
  //Update the title on change of the dropdown menu
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    console.log(event.target.value);
  };

  //Make empty default search
  const [search, setSearch] = useState("");
  //Update results during search
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  //Clear title and search
  const handleClear = () => {
    setTitle("");
    setSearch("");
  };

  //Filter profiles by title
  const filterProfiles = profiles.filter(
    (profile) =>
  (title === "" || profile.title === title) &&
    profile.name.toLowerCase().includes(search.toLowerCase())
  );

  const buttonStyle = {
    border: "1px solid #ccc",
  };


  return (
    <>
      <header>
        <Navbar mode={mode} updateMode={handleModeChange}/>
      </header>

      <main className={mode === "light" ? "light" : "dark"}>
       <Wrapper>
        <h1>Profile App</h1>
       </Wrapper>

       <Wrapper>
        <About/>
       </Wrapper>

      <Wrapper>
        <ProfileForm/>
      </Wrapper>

      <Wrapper>
        <div className="filter-wrapper">

          <div className="filter--select">
            <label htmlFor="title-select">Select a title: </label>
              <select id="title-select" onChange={handleTitleChange} value={title}>
                <option value="">All</option>
                {titles.map((title) => (<option key={title} value={title}>{title}</option>))}
              </select>
          </div>

          <div className="filter--search">
            <label htmlFor="search">Search by name: </label>
                <input type="text" id="search" onChange={handleSearchChange} value={search}/>
                </div>
                
                <button onClick={handleClear} style={buttonStyle}>
                  <span className="sr-only">Reset</span>
                  <FontAwesomeIcon icon={faXmark} />
                </button>

            <div className="profile-cards">
              {filterProfiles.map((profile) => (
                <Card key={profile.email} {...profile} animate={animation} updateAnimate={handleAnimation} />
                ))}
              </div>

        </div>
      </Wrapper>

      </main>
    </>
  );

};

export default App;

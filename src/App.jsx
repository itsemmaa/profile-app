import About from './components/About';
import Navbar from './components/Navbar';
import image_man from './assets/headshot-placeholder1.jpeg';
import image_woman from './assets/headshot-placeholder2.jpeg';
import Card from './components/Card';
import './App.css';
import Wrapper from './components/Wrapper';
import { useState } from "react";

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
  ];

  const [clicked, setclicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };


  return (
    <>
      <header>
        <Navbar/>
      </header>

      <main>
       <Wrapper><h1>Profile App</h1>
       <button onClick={handleClick}>
        {clicked ? "Click Me" : "Clicked"}
       </button>
       </Wrapper>

      <Wrapper><About/></Wrapper>

      <Wrapper>
            <div className="profile-cards">
              {profiles.map((profile) => (
                <Card key={profile.email} {...profile} />
                ))}
              </div>
      </Wrapper>

      </main>
    </>
  );

};

export default App;

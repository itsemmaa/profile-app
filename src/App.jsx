import "./App.css";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddProfile from "./pages/AddProfile";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ProfileIndexPage from "./pages/ProfileIndexPage";
import { ModeContext } from "./contexts/ModeContext";
import { useContext } from "react";

const App = () => {

 const { mode } = useContext(ModeContext);

  return (
    <HashRouter>
      <header>
        <Navbar/>
      </header>

      <main className={mode === "light" ? "light" : "dark"}>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/add-profile" element={<AddProfile/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="profile/:id" element={<ProfileIndexPage/>}>
            <Route index element={<ProfileDetailPage/>}/>
            <Route path="edit" element={<ProfileEditPage/>}/>
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
      </HashRouter>
  );

};

export default App;

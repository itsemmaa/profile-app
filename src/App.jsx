import "./App.css";
import Navbar from "./components/Navbar";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddProfile from "./pages/AddProfile";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ProfileIndexPage from "./pages/ProfileIndexPage";
import ModeContext from "./contexts/ModeContext";
import { useContext } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { useMode } from "./contexts/ModeContext";
import { lazy, Suspense } from "react";

const App = () => {

 const { mode } = useMode();
 const LazyComponent = lazy(() => import("./pages/ProfileDetailPage"));

  return (
    <AuthProvider>
    <HashRouter>
      <header>
        <Navbar/>
      </header>

      <main className={mode === "light" ? "light" : "dark"}>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/add-profile" element={
            <ProtectedRoute>
            <AddProfile/>
            </ProtectedRoute>
          }/>
          <Route path="profile/:id" element={<ProfileIndexPage/>}>
            <Route index element={<Suspense fallback = {<div>Loading...</div>}><LazyComponent/></Suspense>}/>
            <Route path="edit" element={<ProtectedRoute><ProfileEditPage/></ProtectedRoute>}/>
          </Route>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
      </HashRouter>
      </AuthProvider>
  );

};

export default App;

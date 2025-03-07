import { useState, useEffect, useContext, useRef, useLayoutEffect } from "react";
import style from "../styles/ProfileForm.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { use } from "react";
import useAuthForm from "..hooks/authFormHook";

const AuthForm = ({ isRegister = false }) => {

    const { data, error, submitting, successMessage, handleChange, handleSubmit } = useAuthForm(isRegister);
    const nameRef = useRef(null);
    
    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    return (
        <form onSubmit={handleSubmit} className={style["profile-form"]}>
            <input 
            ref={usernameRef}
            type="text"
            name="username" 
            placeholder="Username" 
            value={data.username} 
            onChange={handleChange} 
            required
            />
            { isRegister && <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={data.email} 
            onChange={handleChange} 
            required/> }
            <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            minLength="8"
            value={data.password} 
            onChange={handleChange} 
            required/>

            <button
            type="submit"
            disabled={
                submitting ||
                data.username.trim() === "" ||
                (isRegister && data.email.trim() === "") ||
                data.password.trim() === ""
            }>Submit</button>

            {error && <p className={style["error"]}>{error}</p>}
            {successMessage && <p className={style["success"]}>{successMessage}</p>}

        </form>
    );
};

export default AuthForm;
import { useState, useEffect, useContext, useRef } from "react";
import style from "../styles/ProfileForm.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { use } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

function useAuthForm(isRegister) {

    //const { login } = useAuth();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        username: "",
        password: "",
        email: "",
    });
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData();
        formData.append("username", data.username.trim());
        formData.append("password", data.password.trim());
        if (isRegister) formData.append("email", data.email.trim());
        formData.append("action", isRegister ? "register" : "login");

        try {
            const response = await fetch("https://web.ics.purdue.edu/~barnetem/profile-app/auth.php", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if(data.success){
                setData({
                    username: "", 
                    password: "", 
                    email: "",
                });
                setSuccessMessage(data.success);
                setError("");
                //login();
                dispatch(login());
                navigate("/");
            } else {
                setError(data.error);
                setSuccessMessage("");
            }
        } catch(error){
            setError(error.message);
            setSuccessMessage("");
        }finally {
            setSubmitting(false);
        }
    };
    return {
        data,
        error,
        submitting,
        successMessage,
        handleChange,
        handleSubmit
    }
}

export default useAuthForm;
import {useState} from "react";
import style from '../styles/ProfileForm.module.css';

const ProfileForm = () => {
    const [data, setData] = useState({name: "", title: "", email: "", bio: "", image: null});
    const [errors, setErrors] = useState({ image: "", general: ""});
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        if(e.target.name === "image") {
            const file = e.target.files[0];
            if(file.size > 2000000) {
                setErrors({...errors, image: "Image must be less than 2MB."});
            } else {
            setData({ ...data, image: file });
        }
        console.log(file);
        console.log(data.image);
    } else {
        setData({...data, [e.target.name]: e.target.value});
    }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData();
        formData.append("name", data.name.trim());
        formData.append("email", data.name.trim());
        formData.append("title", data.name.trim());
        formData.append("bio", data.name.trim());
        if (data.image) formData.append("image", data.image);
        console.log(data.image+"test");
        try {
            const response = await fetch("https://web.ics.purdue.edu/~barnetem/profile-app/send-data.php", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            if(result.success){
                setData({name: "", title:"", email:"", bio:"", image: null});
                setErrors({image: "", general:""});
                setSuccessMessage("Data submitted successfully.");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 1000);
            } else {
                setErrors({image: "", general: result.message});
                setSuccessMessage("");
            }
        } catch(error) {
            setErrors({image: "", general: error});
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className={style["profile-form"]} onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={data.name} onChange={handleChange} required/>
            <input type="email" name="email" placeholder="Email" value={data.email} onChange={handleChange} required/>
            <input type="text" name="title" placeholder="Title" value={data.title} onChange={handleChange} required/>
            <textarea name="bio" placeholder="Description" value={data.bio} onChange={handleChange} maxLength={200} required></textarea>
            <p>{data.bio.length}/200</p>
            <label htmlFor="image">Choose a profile image:</label>
                <input type="file" id="image" name="image" accept="image/jpg, image/png, image/jpeg, image/gif" onChange={handleChange}></input>
                {errors.image && <p className={style['error']}>{errors.image}</p>}
            <button type="submit" disabled={submitting || errors.image !=="" || data.name ==="" || data.bio ==="" || data.email ==="" || data.title ==="" || data.imag !==null ? true : false}>Submit</button>
                {errors.general && <p className={style['error']}>{errors.general}</p>}
                {successMessage && <p className={style['success']}>{successMessage}</p>}
        </form>
    );
}


export default ProfileForm;
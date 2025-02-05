import {useState} from "react";
import styles from '../styles/profileForm.module.css';

const ProfileForm = () => {
    const [data, setData] = useState({name: "", title: "", email: "", bio: ""});
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const fetchURL = 'https://web.ics.purdue.edu/~barnetem/profile-app/send-data.php';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target); // Create FormData object
        try {
            const response = await fetch("https://web.ics.purdue.edu/~barnetem/profile-app/send-data.php", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            console.log(result.message);
        }catch(error){
            console.log(error);
        }
    };

    return (
        <form className="profile-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={data.name} onChange={handleChange} required/>
            <input type="email" name="email" placeholder="Email" value={data.email} onChange={handleChange} required/>
            <input type="text" name="title" placeholder="Title" value={data.title} onChange={handleChange} required/>
            <textarea name="bio" placeholder="Description" value={data.bio} onChange={handleChange} required></textarea>
            <button type="submit">Submit</button>
        </form>
    )
}


export default ProfileForm;
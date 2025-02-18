import "./App.css";
import Wrapper from "./components/Wrapper";
import ProfileForm from "./components/ProfileForm";


const AddProfile = () => {
  return (
    <>
      <Wrapper>
        <h1>Add a Profile</h1>
        <ProfileForm/>
      </Wrapper>
    </>
  );
};

export default AddProfile;

import img from '../assets/headshot-placeholder1.jpeg';
import '../styles/card.css';

const Card1 = () => {
    const name = 'John Doe';
    const title = 'Software Engineer';
    const email = 'john@email.com';
    return (
        <div className="profile-card">
            <div className="profile-card_img">
                <img src={img} alt={name} />
            </div>

            <div className="profile-card_content">
                <p><strong>{name}</strong></p>
                <p>{title}</p>
                <p><a href={`mailto:${email}`}>{email}</a></p>
            </div>
        </div>
    );
}
export default Card1;
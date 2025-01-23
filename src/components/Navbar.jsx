import '../styles/navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <a href="#" className="listItem1">Home</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#">Profiles</a>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;
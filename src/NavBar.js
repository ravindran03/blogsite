import { Link } from "react-router-dom";


const NavBar = () => {
    return(
        <nav className="navbar">
            <ul>
                <li>
                    <Link to={'/'} >Homepage</Link>
                </li>
                <li>
                    <Link to={'/articles'}>articles</Link>
                </li>
                <li>
                    <Link to={'/about'}>About</Link>                    
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
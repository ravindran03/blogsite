import { Link } from "react-router-dom";

const NavBar = () => {
    return(
        <nav >
            <ul style={ {float:"inline"}}>
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
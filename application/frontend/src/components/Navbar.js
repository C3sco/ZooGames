import {Link, useMatch, useResolvedPath} from "react-router-dom"
import './navbar.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Navbar(){
    const history = useNavigate();
    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }
    return <nav class="navbar">
        <ul>
            <CustomLink class="a" id="title" to="/Homepage/Homepage">Animal Party</CustomLink>
            <CustomLink class="a" to="/Homepage/Giochi">Giochi</CustomLink>
            <CustomLink class="a"  to="/Giochi/Notizie">News</CustomLink>
            <CustomLink class="a"  to="/Giochi/Video">Video</CustomLink>
            <CustomLink class="a"  to="/components/Login">Login</CustomLink>
            <CustomLink class="a" to="/Giochi/Impiccato">Test</CustomLink>
            <CustomLink class="a" to="/components/Register">Register</CustomLink>
            <button onClick={Logout} className="button is-light">
                                    Log Out
                                </button>
        </ul>

    </nav>

    function CustomLink({ to, children, ...props}){
        
        const resolvePath = useResolvedPath(to)
        const isActive = useMatch({ path: resolvePath.pathname, end: true})
        return(
            <li className={isActive ? "active" : ""}>
                <Link to={to} {...props}>
                    {children}
                </Link>
            </li>
        )
    }




}
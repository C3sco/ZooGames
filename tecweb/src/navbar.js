import {Link, useMatch, useResolvedPath} from "react-router-dom"
import './navbar.css'

export default function Navbar(){
    return <nav class="navbar">
        <ul>
            <CustomLink class="a" to="/Homepage/Giochi">Giochi</CustomLink>
            <CustomLink class="a" to="/Homepage/Login">Login</CustomLink>
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
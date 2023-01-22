import {Link, useMatch, useResolvedPath} from "react-router-dom"
import './navbar.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { supabase } from "./Database.js";
// import '../buttons.css'

export default function Navbar(){
    const history = useNavigate();
    const Logout = async () => {
        try{
            await supabase.auth.signOut();
            alert("Logout effettuato!");
        }catch(err){
            alert("errore!");
        }
        
    }
    return <nav class="navbar">
        <ul><button onClick={Logout} className="c3-logout">
                                    Logout
                                </button>
            {/* <CustomLink class="a" id="title" to="/Homepage">AnimalParty</CustomLink> */}
            <CustomLink class="a" to="/Homepage/Giochi">Giochi</CustomLink>
            <CustomLink class="a"  to="/Giochi/Notizie">News</CustomLink>
            <CustomLink class="a"  to="/Giochi/Video">Video</CustomLink>
            <CustomLink class="a"  to="/components/LoginSupabase">Dashboard</CustomLink>
            <CustomLink class="a" to="/Giochi/Quiz/QuizPage">Quiz</CustomLink>
            {/* <CustomLink class="a" to="/components/Register">Register</CustomLink> */}
            <CustomLink class="a" to="/Giochi/Impiccato/ImpiccatoPage">Impiccato</CustomLink>
            <CustomLink class="a" to="/userPages/Shop">Shop</CustomLink>
            <CustomLink class="a" to="/userPages/Leaderboard">Leaderboard</CustomLink>
            <CustomLink class="a" to="/userPages/Forum">Forum</CustomLink>
            
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
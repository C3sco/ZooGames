import {Link, useMatch, useResolvedPath} from "react-router-dom"
import './navbar.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { supabase } from "./Database.js";

export default function AdminNavbar(){

    const Logout = async () => {
        try{
            await supabase.auth.signOut();
            alert("Logout effettuato!");
        }catch(err){
            alert("errore!");
        }
        
    }
    return <nav class="navbar">
        <ul>
            <CustomLink class="a" id="title" to="/Homepage">Animal Party</CustomLink>
            <CustomLink class="a" to="/Homepage/Giochi">Giochi</CustomLink>
            <CustomLink class="a"  to="/Giochi/Notizie">News</CustomLink>
            <CustomLink class="a"  to="/Giochi/Video">Video</CustomLink>
            <CustomLink class="a"  to="/components/LoginSupabase">Dashboard</CustomLink>
            <CustomLink class="a" to="/components/AdminPage">AdminPage</CustomLink>
            <CustomLink class="a" to="/Giochi/Quiz/QuizPage">Quiz</CustomLink>
            <CustomLink class="a" to="/Giochi/Impiccato/ImpiccatoPage">Impiccato</CustomLink>
            <CustomLink class="a" to="/userPages/Shop">Shop</CustomLink>
            <CustomLink class="a" to="/userPages/Leaderboard">Leaderboard</CustomLink>
            <CustomLink class="a" to="/components/AdminShop">AdminShop</CustomLink>
            <CustomLink class="a" to="/userPages/Forum">Forum</CustomLink>
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
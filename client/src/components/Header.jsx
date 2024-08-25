import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
    <div className='navHeader'>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/decks">Decks</Link></li>
            <li><Link to="/calculator">Calculator</Link></li>
            <li><Link to="/library">Library</Link></li>
            <li><Link to="/random">Random</Link></li>
        </ul>
    </div>
)}

export default Header;
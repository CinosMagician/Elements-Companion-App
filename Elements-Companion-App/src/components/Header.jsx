import { Link } from 'react-router-dom';

const Header = () => {
    return (
    <div>
        <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/decks">Decks</Link></li>
            <li><Link to="/calculator">Calculator</Link></li>
            <li><Link to="/library">Library</Link></li>
            <li><Link to="/random">Random</Link></li>
        </ul>
    </div>
)}

export default Header;
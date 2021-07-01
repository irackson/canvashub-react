import Nav from './Nav';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <div>
            <h1 className="header__title">
                {' '}
                <Link to="/">CanvasHub</Link>
            </h1>
            <Nav />
        </div>
    );
};

export default Header;

import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.scss';
import { useTheme } from '../context/ThemeContext';
import DarkModeToggle from './ThemeSlider';


function Header() {
    const addRoute = '/add';
    const homeRoute = '/';
    const { theme, toggleTheme } = useTheme();

    return (
      <div className={`${theme} d-flex justify-content-center align-items-center`}>
        <Link to={homeRoute}><img src='/images/logo.jpg' className='header-img m-2' alt='Header image'/></Link>
        <h1 className="board-header m-2">Fitness Fanatics</h1>
        <div>
        <DarkModeToggle handleToggle={toggleTheme} theme={theme}/>
        </div>

        <Link to={addRoute} className='add-button m-2'>
          Create Post
        </Link>
      </div>
    );
  }

export default Header
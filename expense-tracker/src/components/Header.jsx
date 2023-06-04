import { useEffect, useRef, useState } from 'react';
import './Header.css';
import { BiMenu } from 'react-icons/bi';
import { BsFillSunFill, BsFillMoonFill, BsTrash3Fill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

const Header = ({ handleConfirmDialog, theme, handleTheme }) => {
  const [showLinks, setShowLinks] = useState(false);

  const refRoutesButton = useRef(null);
  const refRoutes = useRef(null);

  useEffect(() => {
    const outsideClick = (e) => {
      if (
        !refRoutesButton.current.contains(e.target) &&
        !refRoutes.current.contains(e.target)
      ) {
        setShowLinks(false);
      }
    };

    document.addEventListener('click', outsideClick);

    return () => {
      document.removeEventListener('click', outsideClick);
    };
  }, []);

  return (
    <header>
      <nav className={`menu container ${showLinks && 'change-radius'}`}>
        <ul className='menu-list'>
          <li
            className='menu-toggle'
            onClick={() => setShowLinks((prev) => !prev)}
            ref={refRoutesButton}
          >
            <div>
              <BiMenu className='toggle-btn' />
            </div>
          </li>
          <li
            className={`menu-routes ${showLinks && 'show-links'}`}
            ref={refRoutes}
          >
            <NavLink className='menu-link' to='/'>
              Home
            </NavLink>
            <NavLink className='menu-link' to='/history'>
              History
            </NavLink>
          </li>
          <li className='menu-changes'>
            <div className='theme-btn' onClick={handleTheme}>
              {theme === 'light' ? <BsFillMoonFill /> : <BsFillSunFill />}
            </div>
            <BsTrash3Fill onClick={handleConfirmDialog} className='clear-btn' />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

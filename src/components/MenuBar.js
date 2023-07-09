import React from 'react';
import { NavLink } from 'react-router-dom';
import AppLogo from './AppLogo';

function MenuBar() {
  const navLinkStyle = 'nav-link text-white fw-bold';
  return (
    <div className='container-fluid'>
        <nav className='navbar navbar-expand-sm bg-dark'>
            <div className='container-fluid'>     
                <AppLogo/>

                <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className='navbar-nav'>
                        <li className='nav-item me-5'>
                            <NavLink className={navLinkStyle} to='/'>HOME</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className={`${navLinkStyle}`} to='/about'>ABOUT</NavLink>
                        </li>
                    </ul>
                </div>
            </div>  
        </nav>
    </div>
  );
}

export default MenuBar;
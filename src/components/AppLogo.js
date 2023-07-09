import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

function AppLogo() {
    const navLinkStyle = 'nav-link text-white fw-bold';

    return (
    <>
        <NavLink className={`${navLinkStyle} me-5`} to='#'><FaGithub className='me-2'/>GITHUB FINDER</NavLink>
    </>
    );
}

export default AppLogo;
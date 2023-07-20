/**
File: ./src/components/Footer.js
Date       Version  Patch
2023/07/20 1.01     Replace <div> with <footer>
 */
import React from 'react';
import {FaSlackHash} from 'react-icons/fa';

function Footer() {
  return (
    <footer style={{clear: 'both', display: 'block', height: '7rem'}} className='m-5 p-1 text-bg-dark mx-auto text-center'>
        <h1><FaSlackHash/></h1>
        Copyright © {(new Date()).getFullYear()}. All rights reserved.
    </footer>
  );
}

export default Footer;
import React from 'react';
import {BiError} from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

function Errorpage({message}) {
  return (
      <div className='alert alert-dark m-2'>
        <h1 className='mx-auto'><BiError/></h1>
        <strong>
          {message}<br/>
          <NavLink className='text-muted' to='/'>Back</NavLink>
        </strong>        
      </div>
  );
}

export default Errorpage;
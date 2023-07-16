/* 
File: ./src/components/GithubUsersList.js
Purpose: Display list of Github Users.
Date        Dev        Description
2023/07/16  ITA        Moved the functionality that fetches Github Users data into the setGetUsersFetch hook, since this is a functionality that
                       was common, also found in the component ./src/components/SearchComponent.
*/
import React from 'react';
import { NavLink } from 'react-router-dom';
import GithubContext from '../hooks/GithubProvider';
import {useGetUsersFetch} from '../hooks/useGetUsersFetch';
import { useState, useEffect, useContext } from 'react';
import Spinner from './Spinner';
import Alert from './Alert';

function GithubUsersList() {
    const {users, usersLoaded, usersCleared, githubDispatch} = useContext(GithubContext);
    const [errorMsg, setErrorMsg] = useState();
    const [output] = useGetUsersFetch(null, true); 
    
    useEffect(()=> {
        if (usersLoaded)
            return;

        if (output.users !== undefined) {
            githubDispatch({type: 'SET_USERS', payload: {users: output.users}});
        }
        else if (output.error !== undefined)
            setErrorMsg(output.error);
    }, [output]);
    
    return (
        <>            
            {(errorMsg !== undefined)?
                <Alert message={errorMsg} />
                :
                {usersLoaded}?
                <>
                    <div className='mt-2'>
                        {users.map(user => {
                            return ( 
                                <div key={user.login} className='card  container-fluid border border-none border-0 text-bg-secondary m-2 float-start shadow' style={{width: '20rem'}}>
                                    <div className='card-body'>
                                        <img className='float-start thumbnail pe-2 rounded-circle' src={user.avatar_url} style={{height: '5rem'}} alt={user.login} />
                                        <div>
                                            <h5 className='card-title'>{user.login}</h5>
                                            <NavLink to={`/users/${user.login}`} className='text-muted'  style={{textDecorationLine: 'none'}}>View Profile</NavLink>
                                        </div>
                                    </div>
                                </div>

                            );
                        })}
                    </div>
                    {((users.length === 0) && (usersCleared === false)) &&
                        <Alert message='Users not found!' />
                    }
                </>:
                <Spinner/>
            }
        </>        
    );
}

export default GithubUsersList;
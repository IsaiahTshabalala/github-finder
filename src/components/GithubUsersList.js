import React from 'react';
import { NavLink } from 'react-router-dom';
import GithubContext from '../hooks/GithubProvider';
import { useState, useEffect, useContext } from 'react';
import Spinner from './Spinner';
import Alert from './Alert';

function GithubUsersList() {
    const {users, usersLoaded, usersCleared, setUsers} = useContext(GithubContext);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        // This is needed for when a call to setUsers in the GithubProvider obtained no users.
        // In this case the error as to the cause must be retrieved and displayed as an alert.
        if (users.length === 0)
            setUsers()
            .then(results=>{ 
                    setErrorMsg(null);
                },
                error=> {                
                    setErrorMsg(`Error status ${error.status}: ${error.statusText}`);
                });
        }, []);
    
    return (
        <>            
            {(errorMsg !== null)?
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
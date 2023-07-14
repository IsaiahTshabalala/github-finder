import React from 'react';
import { NavLink } from 'react-router-dom';
import GithubContext from '../hooks/GithubProvider';
import { getUsers } from '../actions/githubActions';
import { useState, useEffect, useContext } from 'react';
import Spinner from './Spinner';
import Alert from './Alert';

function GithubUsersList() {
    const {users, usersLoaded, usersCleared, githubDispatch} = useContext(GithubContext);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        async function setUsers() {
            let success = true;
            let output;

            await getUsers()
                    .then(results=> {
                        githubDispatch({type: 'SET_USERS', payload: {users: results.json}}); // Earmark the action for setting users
                        output = {status: 200, statusText: 'OK'};
                    },
                    error=>{
                        success = false;
                        output = {
                            status: error.status,
                            statusText: (error.status === undefined)?
                                        'Some error occurred. Please check your connection. Then reload the page.': error.statusText
                        };

                        if (output.status === 404)
                            output.statusText = 'Not found.';
                    });

            // The process of getting of users was executed even if it returned a blank.
            githubDispatch({type: 'SET_USERS_LOADED', payload: {usersLoaded: true}});
            return success? Promise.resolve(output): Promise.reject(output);
        }
    
        
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
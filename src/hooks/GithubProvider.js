import {createContext, useEffect, useReducer} from 'react';
import {GithubReducer, getUsers, getUser, getUserRepos} from './GithubReducer';
import propTypes from 'prop-types';
import Errorpage from '../components/Errorpage';

const GithubContext = createContext();

const initialState = {
    users: [],
    usersLoaded: false,
    usersCleared: false,
    clickedUser: null
};

export function GithubProvider({children}) {
    const [githubState, githubDispatch] = useReducer(GithubReducer, initialState);

    async function setUsers(query = null) {
        let success = true;
        let output;

        await getUsers(query)
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
                })
                .catch(error=> {
                    success = false;
                    output = error;
                });

        // The process of getting of users was executed even in the case where it returned a blank
        githubDispatch({type: 'SET_USERS_LOADED', payload: {usersLoaded: true}});
        return success? Promise.resolve(output): Promise.reject(output);
    }

    async function searchUsers(keyword){
        if (keyword === ''){
            clearUsers();
            return;
        }
        const query = new URLSearchParams(`q=${keyword} in:login&sort=login&order=asc`);
        return await setUsers(query);
    }

    function clearUsers(){
        githubDispatch({type: 'CLEAR_USERS', payload: null});
    }
    
    async function setClickedUser(username) {
        let success = true;
        let output;
        await getUser(username)
                .then(results=> {
                    githubDispatch({type: 'SET_CLICKED_USER', payload: {clickedUser: results.json}});
                    output = {status: 200, statusText: 'OK'};
                },
                error=> {
                    success = false;
                    if (error.status === 404)
                        error.statusText = 'Not found';
                    
                    error.statusText = (error.status === undefined)?
                                        'Some error occurred. Please check your connection. Then reload the page.' : error.statusText;
                    output = {
                        status: error.status,
                        statusText: error.statusText
                    };
                });
        
        return success? Promise.resolve(output): Promise.reject(output);
    }

    async function setClickedUserRepos() {
        let success = true;
        let output = null;

        if (githubState.clickedUser === null)
            return Promise.reject({
                status: undefined,
                statusText: 'clickedUser not set'
            });
        
        await getUserRepos(githubState.clickedUser.login)
                .then(results=> {
                    githubDispatch({type: 'SET_CLICKED_USER_REPOS', payload: {repos: results.json}});
                    output = {status: results.status, statusText: results.statusText};
                },
                error=>{
                    success = false;
                    output = {
                        ...error // fields: status and statusText
                    };
                });

        return success? Promise.resolve(output) : Promise.reject(output);
    }

    useEffect(() => {
        async function call(){
            return await setUsers();
        }

        call() // To render an asynchronous call setUsers synchronous.
        .then(results=>{},
              error=> {});
        }, []);

    if (githubState === undefined){
        return (
            <>
                <Errorpage message='Could not load application state! Please reload or try again later.'/>
            </>
        );
    }

    return (
    <GithubContext.Provider
        value={{
            ...githubState,
            setUsers,
            searchUsers,
            clearUsers,
            setClickedUser,
            setClickedUserRepos
        }}>
        {children}
    </GithubContext.Provider>
    );
}

GithubProvider.propTypes = {
    children: propTypes.node.isRequired
};

export default GithubContext;
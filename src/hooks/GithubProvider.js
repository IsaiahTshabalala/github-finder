import {createContext, useReducer} from 'react';
import GithubReducer from './GithubReducer.js';
import propTypes from 'prop-types';

const GithubContext = createContext();

const initialState = {
    users: [],
    usersLoaded: false,
    usersCleared: false,
    clickedUser: null
};

export function GithubProvider({children}) {
    const [githubState, githubDispatch] = useReducer(GithubReducer, initialState);

    return (
    <GithubContext.Provider
        value={{
            ...githubState,
            githubDispatch
        }}>
        {children}
    </GithubContext.Provider>
    );
}

GithubProvider.propTypes = {
    children: propTypes.node.isRequired
};

export default GithubContext;
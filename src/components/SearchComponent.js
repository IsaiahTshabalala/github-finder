/*
File: ./src/components/SearchComponent.js
 Purpose: 
 When ever the end-user types a keyword and hits ENTER or clicks the GO button, search for and updated the state
 with the Github users returned.
 Date        Dev    Description
 2023/07/16  ITA    The function that fetches Github users (SearchUsers) was made into a useGetUsersFetch custom hook. 
                    Since it is a common functionality found in found also found in the component ./src/components/GithubUsersList.js
*/
import React, {useState, useContext} from 'react';
import GithubContext from '../hooks/GithubProvider';
import { useGetUsersFetch } from '../hooks/useGetUsersFetch';

function SearchComponent() {
    const [searchText, setSearchText] = useState('');
    const {users, githubDispatch} = useContext(GithubContext);
    const [output, requestFetch] = useGetUsersFetch(null, false); // No data will be returned here...

    function clearUsers() {
        githubDispatch({type: 'CLEAR_USERS'});
    }       

    function handleSubmit(e){
        e.preventDefault();
        requestFetch(searchText); // This enables fetching of users matching the search keywords and updating output object.
        githubDispatch({type: 'SET_USERS', payload: {users: output.users}});
    }

    function clearList(e){
        setSearchText('');
        clearUsers();
    }

    function handleChange(e){
        setSearchText(e.target.value);
    }

    return (
        <div className='m-2 p-2'>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input className="form-control me-2" type="search" required placeholder="Search" aria-label="Search" 
                        onChange={handleChange} value={searchText}/>
                <button className="btn btn-dark fw-bold me-2" type="submit">GO</button>
                <button className="btn btn-secondary fw-bold" onClick={clearList}>CLEAR</button>
            </form>
        </div>
    );
}

export default SearchComponent;
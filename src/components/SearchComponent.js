/*
File: ./src/components/SearchComponent.js
 Purpose: 
 When ever the end-user types a keyword and hits ENTER or clicks the GO button, search for and updated the state
 with the Github users returned.
Date        Dev    Version  Description
2023/07/16  ITA    V1.00    The function that fetches Github users (SearchUsers) was made into a useGetUsersFetch custom hook. 
                            Since it is a common functionality found in found also found in the component ./src/components/GithubUsersList.js
2023/07/17  ITA    V1.01    Added a useEffect and two useState hooks (submitted, fetched) to facilitate the fetching of data after the user has typed and entered a search keyword.
*/
import React, {useState, useEffect, useContext} from 'react';
import GithubContext from '../hooks/GithubProvider';
import { useGetUsersFetch } from '../hooks/useGetUsersFetch';

function SearchComponent() {
    const [searchText, setSearchText] = useState('');
    const {githubDispatch} = useContext(GithubContext);
    const [output, requestFetch] = useGetUsersFetch(null, false); // No data will be returned here...
    const [fetched, setFetched] = useState(false);
    const [submitted, setSubmitted] = useState('');

    function clearUsers() {
        githubDispatch({type: 'CLEAR_USERS'});
    }       

    function handleSubmit(e){
        e.preventDefault();
        if (submitted === searchText)
            return;

        setSubmitted(searchText); // This enables fetching of users matching the search keywords and updating output object.
        setFetched(false);
    }

    function clearList(e){
        setSearchText('');
        clearUsers();
    }

    function handleChange(e){
        setSearchText(e.target.value);
    }
    
    useEffect(()=> {
        if (submitted !== '') {
            if (!fetched) { 
                requestFetch(submitted);
                setFetched(true); // Indicates that data was fetched. It takes time before output is updated, so
                                  // we do not want to call another fetch, but to wait until the fetched data is realised.
            }
            if (output !== undefined)
                githubDispatch({type: 'SET_USERS', payload: {users: output.users}});
        }
    }, [submitted, output]);

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
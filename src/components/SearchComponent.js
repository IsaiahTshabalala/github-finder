import React, {useState, useContext} from 'react';
import GithubContext from '../hooks/GithubProvider';
import { getUsers } from '../actions/githubActions';

function SearchComponent() {
    const [searchText, setSearchText] = useState('');
    const {users, githubDispatch} = useContext(GithubContext);

    function clearUsers() {
        githubDispatch({type: 'CLEAR_USERS'});
    }
        
    async function searchUsers(keyword) {
        let success = true;
        let output;
        
        githubDispatch({type: 'CLEAR_USERS'});
        
        const query = new URLSearchParams(`q=${keyword} in:login&sort=login&order=asc`);
        await getUsers(query)
                .then(result=> {
                    githubDispatch({type: 'SET_USERS', payload: {users: result.json}});
                    output = {status: result.status, statusText: result.statusText};
                },
                error=> {
                    success = false;
                    output = error;
                });
        return success? Promise.resolve(output) : Promise.reject(output);
    }

    function handleSubmit(e){
        e.preventDefault();
        searchUsers(searchText);
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
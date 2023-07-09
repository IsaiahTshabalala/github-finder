import React, {useState, useContext} from 'react';
import GithubContext from '../hooks/GithubProvider';

function SearchComponent() {
    const [searchText, setSearchText] = useState('');
    const {searchUsers, clearUsers} = useContext(GithubContext);

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
/* File: useGithubUsersFetch.js
Description: 
Custom hooks for fetching Github Users data.
Date        Description
2023/07/16  Genesis
*/
import { useEffect, useState } from "react";
import { getUsers } from "../actions/githubActions";


export function useGetUsersFetch(aKeyword, getDataNow = true) {
/* 
If you do not desire to get data immediately, such as, for example, when you yet to know what 
the search keyword is, call this hook with aKeyword = null and getDataNow = false.
You can then fetch the data at any time by call requestFetch later, with or without the keyword argument.
This will then fetch Github users data and set output object.
 */
    const [output, setOutput] = useState({});
    const [keyword, setKeyword] = useState(aKeyword);
    const [getNow, setGetNow] = useState(getDataNow);

    function requestFetch(parKeyword = null){
        setKeyword(parKeyword);
        setGetNow(true);
    }
    
    useEffect(()=> {
        if (getNow) {
            let query;
            if (keyword !== null && keyword !== undefined)
                query = new URLSearchParams(`q=${keyword} in:login&sort=login&order=asc`);            
            getUsers(query)
            .then(result=> {
                setOutput((prevState)=> {
                    return {users: result.json};
                });
            },
            error=> {
                setOutput({error: `Error status ${error.status}: ${error.statusText}`});
            });
        }
    }, [keyword, getNow]);
    return [output, requestFetch];
} // export function useGetUsersFetch({keyword})
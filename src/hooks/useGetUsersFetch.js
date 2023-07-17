/* File: useGithubUsersFetch.js
Description: 
Custom hooks for fetching Github Users data.
Date        Dev  Version Description
2023/07/16  ITA  V1.00   Genesis
2023/07/17  ITA  V1.01   Initialised output to undefined, to make it easier to verify if it has realised the fetched data it was assigned.
                         Added default parameters to the custom hook and the requestFetch function.
*/
import { useEffect, useState } from "react";
import { getUsers } from "../actions/githubActions";


export function useGetUsersFetch(aKeyword = null, getDataNow = true) {
/* 
If you do not desire to get data immediately, such as, for example, when you are yet to know what 
the search keyword is, call this hook with arguments aKeyword = null and getDataNow = false.
You can then fetch the data at any time by calling requestFetch later, with or without the arguments.
This will then fetch Github users data and set output object.
 */
    const [output, setOutput] = useState();
    const [keyword, setKeyword] = useState(aKeyword);
    const [getNow, setGetNow] = useState(getDataNow);

    function requestFetch(parKeyword = null, parGetDataNow = true){
        setKeyword(parKeyword);
        setGetNow(parGetDataNow);
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
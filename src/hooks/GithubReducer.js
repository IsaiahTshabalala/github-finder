
export function GithubReducer(state, action) {
    // actions is an array of action objects, each with type and payload fields
    
    switch (action.type) {
        case 'SET_USERS':
            state = {...state, users: action.payload.users, usersLoaded: true, usersCleared: false};
            break;
        case 'SET_ USERS_LOADED':
            state = {...state, usersLoaded: action.payload.usersLoaded};
            break;
        case 'CLEAR_USERS':
            state = {...state, usersLoaded: true, users: [], usersCleared: true};
            break;
        case 'SET_USERS_EMPTY':
            state = {...state, users: [], usersCleared: false};
            break;
        case 'SET_CLICKED_USER':
            state = {...state, clickedUser: action.payload.clickedUser};
            break;
        case 'CLEAR_CLICKED_USER':
            state = {...state, clickedUser:  null};
            break;
        case 'SET_CLICKED_USER_REPOS':
            state = {...state, clickedUser: {...state.clickedUser, repos: action.payload.repos}};
            break;
        }
    return state;
}

export async function getUsers(query = null) {
    let path;
    if (query === null)
        path = `${process.env.REACT_APP_GITHUB_API_PATH}/users`;
    else
        path = `${process.env.REACT_APP_GITHUB_API_PATH}/search/users?${query}`;

    const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
            };

    let output = null;
    let success = true;
    
    let response = await fetch(path, {headers});

    output = {
        status: response.status,
        statusText: response.statusText
    };

    if (response.status >= 200 && response.status <= 299){
        await response.json()
                .then(results=> {
                    results = (query !== null? results.items : results);
                    output = {
                        ...output,
                        json: results.map(user=> {
                                                return {login: user.login, avatar_url: user.avatar_url};
                                            })
                    };
                },
                errors=>{
                    success = false;
                    output = {
                        status: undefined,
                        statusText: 'Some error occurred'
                    };
                });

        return success? Promise.resolve(output) : Promise.reject(output);
    }
    else{
        return Promise.reject(output);
    }
} // export async function getUsers()

export async function getUser(username){
    if (username === null || username === undefined) {
        return Promise.reject({status: 404, statusText: 'Not found. Please provide a username'});
    }

    const path = `${process.env.REACT_APP_GITHUB_API_PATH}/users/${username}`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
    };

    let success = true;
    let output = null;
    let response = await fetch(path, {headers});

    if (response.status >= 200 && response.status <= 299) {
        await response.json()
                .then(result=> {
                    output = {
                        status: response.status,
                        statusText: response.statusText,
                        json: result
                    }
                },
                error=> {
                    success = false;
                    output = {status: undefined, statusText: 'Some error occurred'};
                });
    } // if (response.status >= 200 && response.status <= 299)
    else{
        success = false;
        output = {status: response.status, statusText: response.statusText};
    }

    return success? Promise.resolve(output) : Promise.reject(output);
} // export async function getUser(username)

export async function getUserRepos(username) {
    let path = `${process.env.REACT_APP_GITHUB_API_PATH}/users/${username}/repos`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
    };

    const searchParams = new URLSearchParams({sort: 'created'});
    searchParams.append('per_page', '10');
    path = `${path}?${searchParams}`;
    const response = await fetch(path, {headers});
    let success = true;
    let output = null;
    
    if (response.status >= 200 && response.status <= 299) {
        output = {status: response.status, statusText: response.statusText};
        await response.json()
            .then(results=> {
                output.json = results;
            },
            error=> {
                success = false;
                output = {status: undefined, statusText: 'Some error occurred'};
            }); 
    } // if (response.status >= 200 && response.status <= 299) 
    else {
        success = false;
        output = {status: undefined, statusText: 'Some error occurred'};
    } // else

    return success? Promise.resolve(output) : Promise.reject(output);
}
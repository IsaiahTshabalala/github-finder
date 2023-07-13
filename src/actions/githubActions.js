import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_GITHUB_API_PATH,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
    }
});

export async function getUsers(query = null) {
    let path;
    if (query === null)
        path = '/users';
    else
        path = `/search/users?${query}`;

    let output = null;
    let success = true;
    
    await axiosInstance.get(path)
                .then(results=> {
                    let json;
                    if (results.data.length !== undefined && results.data.length > 0) {
                        json = results.data.map(user=> {
                            return {login: user.login, avatar_url: user.avatar_url};
                        });
                    }
                    else
                        json = results.data.items.map(user=> {
                            return {login: user.login, avatar_url: user.avatar_url};
                        });

                    output = {
                        status: results.status, 
                        statusText: 'OK',
                        json
                    };

                }, error=> {
                    success = false;
                    output = {
                        status: error.request.status,
                        statusText: error.message
                    };
                }); // await axiosInstance.get(path).then

    return success? Promise.resolve(output) : Promise.reject(output);
} // export async function getUsers()

export async function getUser(username){
    if (username === null || username === undefined) {
        return Promise.reject({status: 404, statusText: 'Not found. Please provide a username'});
    }

    const path = `/users/${username}`;

    let success = true;
    let output = null;
    await axiosInstance.get(path)
            .then(results=> {
                output = {
                    status: results.status,
                    statusText: 'OK',
                    json: results.data
                }
            },
            error=>{
                success = false;
                output = {
                    status: error.request.status,
                    statusText: error.message
                }
            });
    return success? Promise.resolve(output) : Promise.reject(output);
} // export async function getUser(username)

export async function getUserRepos(username) {
    let path = `/users/${username}/repos`;
    let success = true;
    let output = null;

    const searchParams = new URLSearchParams({sort: 'created'});
    searchParams.append('per_page', '10');
    path = `${path}?${searchParams}`;
    await axiosInstance.get(path)
            .then(results=> {
                const json = results.data;

                output = {
                    status: results.status,
                    statusText: 'OK',
                    json: results.data
                };
            },
            error=> {
                success = false;
                output = {
                    status: error.request.status,
                    statusText: error.message
                };
            });

    return success? Promise.resolve(output) : Promise.reject(output);
} // export async function getUserRepos(username) 

export async function getUserAndRepos(username) {
    let output;
    let success = true;
    await Promise.all([getUser(username), // get user.
                       getUserRepos(username)]) // get user's repo.
                       .then(results=> {
                            output = {
                                status: results[0].status,
                                statusText: results[0].statusText,
                                json: {
                                    user: results[0].json,
                                    userRepos: results[1].json
                                }
                            };
                       },
                       error=> {
                            success = false;
                            output = error;
                       });

    return success? Promise.resolve(output) : Promise.reject(output);
} // export function getUserAndRepos(username) 


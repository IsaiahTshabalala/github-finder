
export default function GithubReducer(state, action) {
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

import { BsShopWindow } from 'react-icons/bs';
import {FaUsers, FaUserFriends, FaCodepen} from 'react-icons/fa';
import React, {useContext, useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import GithubContext from '../hooks/GithubProvider';
import { getUserAndRepos} from '../actions/githubActions';
import Spinner from './Spinner';
import Alert from './Alert';
import Stats from './Stats';
import Repos from './Repos';

function User() {
  const {clickedUser, githubDispatch} = useContext(GithubContext);
  const {username: parUsername} = useParams();
  const [altDisplay, setAltDisplay] = useState(<Spinner/>);
  
  const fieldsAbout = [
    {caption: 'Location', fieldName: 'location'},
    {caption: 'Website', fieldName: 'blog'},
    {caption: 'Twitter', fieldName: 'twitter_username'},
    {caption: 'company', fieldName: 'Company'}
  ];

  const fields = [
    {caption: 'Followers', fieldName: 'followers', icon: <FaUsers/>, width: '6rem'},
    {caption: 'Following', fieldName: 'following', icon: <FaUserFriends/>, width: '6.5rem'},
    {caption: 'Public Repos', fieldName: 'public_repos', icon: <FaCodepen/>, width: '8rem'},
    {caption: 'Public Gists', fieldName: 'public_gists', icon: <BsShopWindow/>, width: '8rem'}
  ];

  useEffect(()=> {
      
    async function setClickedUserAndRepos(username) {
      let success = true;
      let output;
      await getUserAndRepos(username)
              .then(results=> {
                  let user = results.json.user;
                  user.repos = results.json.userRepos;
                  githubDispatch({type: 'SET_CLICKED_USER', payload: {clickedUser: user}});
                  output = {status: 200, statusText: 'OK'};
              },
              error=> {
                  success = false;
                  if (error.status === 404)
                      error.statusText = 'Not found';
                  
                  error.statusText = (error.status === undefined)?
                                      'Some error occurred. Please check your connection. Then reload the page.' : error.statusText;
                  output = {
                      status: error.status,
                      statusText: error.statusText
                  };
              });
      
      return success? Promise.resolve(output): Promise.reject(output);
  }

  async function setUser () {
    await setClickedUserAndRepos(parUsername)
      .then(results=> {},
      error=> setAltDisplay(<Alert message={`Error status ${error.status}: ${error.statusText}`}/>));  
  }
  
  setUser();
  }, []);

  return (
    <div className='m-2 container-fluid'>
      <NavLink className='m-3' style={{textDecoration: 'none'}} to='/'><h6><span className='text-light'>Back to Search</span></h6></NavLink>
      <div>
      {(clickedUser !== null)?
        <div className='container-fluid border-0'>
          <div className='text-bg-secondary border-0'>
            <div className='card text-bg-secondary col float-start border-0'>
              <img src={clickedUser.avatar_url} alt={clickedUser.login}  style={{width: '15rem', height: 'auto'}}/>
              <div className='card-img-overlay' style={{marginTop: '10rem'}}>
                <strong>{clickedUser.name}</strong><br/>
                <p>{clickedUser.login}</p>
              </div>
            </div>   
            <div className='card text-bg-secondary col-sm-8 m-1 float-start border-0'>
              <div className='card-body'>
                <h5 className='card-title'>{clickedUser.name}</h5>
                <p className='card-text'>{clickedUser.bio}</p>
                <a href={clickedUser.html_url} className='btn btn-secondary border-light'>VISIT GITHUB PROFILE</a>
              </div>
            </div>            
            <div className='float-start'>
              <Stats fields={fieldsAbout}/>
            </div>
          </div>

          <div style={{clear: 'both', display: 'block'}}/>          
          <Stats fields={fields} valueFontSize='1.5rem'/>
          <Repos/>
        </div>
        :
        <>{altDisplay}</>
      }
      </div>
    </div>
  );
}

export default User;
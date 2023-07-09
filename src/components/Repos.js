import {useContext, useEffect, useState} from 'react';
import GithubContext from '../hooks/GithubProvider';
import {FaLink} from 'react-icons/fa';
import {AiFillStar, AiFillEye} from 'react-icons/ai';
import {LuGitFork} from 'react-icons/lu';
import {BsInfo} from 'react-icons/bs';

import Alert from './Alert';

function Repos() {
    const { clickedUser, setClickedUserRepos } = useContext(GithubContext);
    const [errorGettingRepos, setErrorGettingRepos] = useState(null);

    useEffect(()=>{
        if (clickedUser.repos === undefined) {
            setClickedUserRepos()
            .then(results=> {
                setErrorGettingRepos(null);
            },
            error=> {
                setErrorGettingRepos(`Error status ${error.status}: ${error.statusText}`);
            });
        }
    }, [clickedUser]);


    return (
        <div className='mt-3'>
            {(clickedUser !== null && clickedUser.repos !== undefined)?
                <div>
                    <h5 className='m-2'>Latest repositories</h5>
                    {clickedUser.repos.map(repo=> {
                        return (
                            <div  key={repo.name} className="card border text-bg-dark border-0  m-2">
                                <div className="card-body">
                                    <h6  className='card-title'>
                                        <FaLink/><span className='ms-2'>{repo.name}</span>
                                    </h6>
                                    <div>
                                        <span className='rounded text-primary ms-1 me-2'>
                                            <strong>
                                                <AiFillEye/>{repo.watchers_count}
                                            </strong>
                                        </span>
                                        <span className='rounded text-success ms-1 me-2'>
                                            <AiFillStar/>{repo.stargazers_count}
                                        </span>
                                        <span className='rounded text-danger ms-1 me-2'>
                                            <BsInfo/>{repo.open_issues_count}
                                        </span>
                                        <span className='rounded text-warning ms-1 me-2'>
                                            <LuGitFork/>{repo.forks_count}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                :
                (errorGettingRepos !== null) &&
                   <Alert message={errorGettingRepos} />
            }
        </div>
    );        
}

export default Repos;

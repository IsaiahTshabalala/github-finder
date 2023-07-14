import {useContext} from 'react';
import GithubContext from '../hooks/GithubProvider';
import {FaLink} from 'react-icons/fa';
import {AiFillStar, AiFillEye} from 'react-icons/ai';
import {LuGitFork} from 'react-icons/lu';
import {BsInfo} from 'react-icons/bs';

function Repos() {
    const { clickedUser } = useContext(GithubContext);
    // The repos of the clicked user are obtained during the process of setting the clicked user (setClickedUserAndRepos)

    return (
        <div className='mt-3'>
            {(clickedUser !== null && clickedUser.repos !== undefined && clickedUser.repos.length > 0) &&
                <div>
                    <h5 className='m-2'>Latest repositories</h5>
                    {clickedUser.repos.map(repo=> {
                        return (
                            <div  key={repo.id} className="card border text-bg-dark border-0  m-2">
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
            }
        </div>
    );        
}

export default Repos;

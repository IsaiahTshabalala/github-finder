import MenuBar from './components/MenuBar';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import SearchComponent from './components/SearchComponent';
import GithubUsersList from './components/GithubUsersList';
import { GithubProvider } from './hooks/GithubProvider';
import Errorpage from './components/Errorpage';
import User from './components/User';
import Footer from './components/Footer';

function App() {
  return (
    <div className='container-fluid text-bg-secondary h-100'>
      <GithubProvider>
        <RouterProvider
            router = {createBrowserRouter([
            {
              element:  <>
                          <MenuBar/>
                          <SearchComponent/>
                          <GithubUsersList/>
                          <Footer/>
                        </>,
              path: '/',
              errorElement: <>
                              <MenuBar/>
                              <Errorpage message='Not found.'/>
                              <Footer/>
                            </>
            },
            {
              element:  <>
                          <MenuBar/>
                          <User/>
                          <Footer/>
                        </>,
              path: '/users/:username'
            }
          ])}
        />
      </GithubProvider>
    </div>
  );
}

export default App;

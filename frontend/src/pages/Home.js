import React, { Fragment} from 'react';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import HomePost from '../components/Post/HomePost';
import NewPost from '../components/Post/NewPost';
import HomeProfil from '../components/Profil/HomeProfil';

const Home = () => {

    const fetchToken = () => {
        const token = Cookies.get().jwt;
        if (!token) {
          window.location.replace("http://localhost:3001/")
        }
      }
      fetchToken();
    
    return (
        <Fragment>
            <Header />
            <div className="home-container">
                <div className="home-profil">
                    <HomeProfil/>    
                </div>
                <div className="home-post">
                    <HomePost/>
                </div>
                <div className="home-newPost">
                    <NewPost/>
                </div>
            </div>
        </Fragment>
    );
};

export default Home;
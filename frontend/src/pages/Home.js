import React, { Fragment} from 'react';
import Header from '../components/Header';
import HomePost from '../components/Post/HomePost';
import NewPost from '../components/Post/NewPost';
import HomeProfil from '../components/Profil/HomeProfil';
import { fetchToken } from '../components/Utils';

const Home = () => {

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
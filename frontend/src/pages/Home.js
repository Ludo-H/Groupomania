import React, { Fragment} from 'react';
import Header from '../components/Header';
import HomePost from '../components/Post/HomePost';
import HomeProfil from '../components/Profil/HomeProfil';

const Home = () => {

    
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
            </div>
        </Fragment>
    );
};

export default Home;
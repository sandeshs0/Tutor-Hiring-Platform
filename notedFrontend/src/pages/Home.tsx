import React from 'react';
// import Benefits from '../components/Benefits';
import LineSeparator from '../Components/LineSeparator';
import NavBar from '../Components/navbar';
import HeroSection from '../Components/newHero';
import Blog from '../Components/tutorCard';
// import TopProducts from '../components/TopProducts';
// import UniqueSellingPoint from '../components/UniqueSellingPoint/UniqueSellingPoint';

const Home: React.FC = () => {
    return (
        <>
        <NavBar />
        <HeroSection/>
        <LineSeparator/>
        <Blog/>

            {/* <TopProducts />
            <UniqueSellingPoint /> */}
            {/* <Benefits /> */}
        </>
    );
};

export default Home;

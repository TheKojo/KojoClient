import Carousel from 'rsuite/Carousel';
import './Home.css';

export default function Home() {

    return (
        <>
            <h5>About the creator</h5>
            <div>
                I develop this game as a private, heavily modified fork of <a href='https://github.com/Maruno17/pokemon-essentials/releases' target='_blank' rel='noreferrer'>pokemon-essentials</a>. I'm a professional software developer, but this game is made in my spare time as a hobby. The game is distributed for free to the community to test, and I make no profit from it.
                <br />
                <br />
                My public repos on GitHub can be found <a href='https://github.com/TheKojo' target='_blank' rel='noreferrer'>here</a>. The backend API for this website was built using a C# ASP.NET controller and is currently hosted on Azure. The front end and database are built in React and PostgreSQL respectively, and are both currently hosted using AWS.
            </div>
            <br />
            <h5>About the game</h5>
            <div className="imgCar">
                <Carousel autoplay className="custom-slider">
                    <img src={require('./images/screenshots/ss1.png')} />
                    <img src={require('./images/screenshots/ss2.png')} />
                    <img src={require('./images/screenshots/ss3.png')} />
                    <img src={require('./images/screenshots/ss4.png')} />
                    <img src={require('./images/screenshots/ss5.png')} />
                </Carousel>
            </div>
            <br />
            <div>
                <p>P-Spectrum is a fan made Pokemon clone built in Ruby and mkxp-z. The current beta release is v1.4.3, which includes an updated screen resolution, revamped UI, map redesigns, new sprite animations, and creature redesigns.</p>
            </div>
        </>
    );
};
import Carousel from 'rsuite/Carousel';
import './ComingSoon.css';

export default function ComingSoon() {

    return (
        <div>
            <div id="block1">
                <div id="carWrapper">
                    <Carousel className="imagesCars">
                        <img src={require('./images/screenshots/nightslashanim.gif')} alt='' />
                        <img src={require('./images/screenshots/lstest2.gif')} alt='' />
                        <img src={require('./images/screenshots/peckanim.gif')} alt='' />
                    </Carousel>
                </div>
                <p>The next beta release under development is v1.5.0. A revamp is currently being done on the battle animations to speed up the battle system. HP bar drains and type effectiveness messages will be displayed while move animations are running, rather than being separate text messages. Many moves that were previously missing animations will be finally be given new ones.</p>
                <br />
                <p>In addition, moves that have a passive effect such as Leech Seed and Stealth Rock will be visible on the field, so it's clearer when these moves are active.</p>
            </div>
            <div id="block2">
                <br/>
                <div>
                    <div className="images">
                        <div id='img1'>
                            <img src={require('./images/screenshots/ssnew1.png')} className="newSS" alt='' />
                        </div>
                        <div id='img2'>
                            <img src={require('./images/screenshots/ssnew2.png')} className="newSS" alt='' />
                        </div>
                    </div>
                    <p>The update will be upgrading the Ruby Game Scripting System engine for drastically improved performance. The screen size will be yet again increased and adjusted to now fit 16:9 resolutions.</p>
                    <br />
                    <p>To fit these performance and screen enhancements, the game will be getting a giant visual update. Every map is in the process of being overhauled with whole new assets, and some maps will have entirely new layouts. Story content will be added so that content up to the fourth of the eight bosses will be playable. </p>
                    <br />
                    <p>Quality of life updates will include mouse functionality being added to further parts of the user interface (inventory screen, box storage screen) and increased transparency of party members' stats. The EXP system will also be redesigned to allow passive EXP gain for all party members. EXP scaling and the general game balance will be redesigned with this new system in mind.</p>
                    <br />
                    <p>The current release estimate is late 2023-early 2024.</p>
                </div>
            </div>
        </div>
    );
};
import React, { useRef, useCallback } from 'react';
import { useWindowDimensions } from './WindowDimensions';


function padNum(val) {
    if (val < 10) {
        return '00' + val;
    }
    else if (val < 100) {
        return '0' + val;
    }
    else {
        return val;
    }
}

function typeColor(props) {
    if (props.type2 === null || props.type2 === undefined || props.type2 === 'NONE' || props.type2 === '') {
        return props.type1;
    }
    else {
        return props.type2;
    }
}



const RenderedBox = (props) => {

    var imgExtension = ".png";
    if (props.focus === "view-focus") {
        imgExtension = ".gif";
    }

    return (
        <div className={props.focus} onClick={() => props.focusFunc(props.pkmId, props.index)}>
            <link href='https://fonts.googleapis.com/css?family=Electrolize' rel='stylesheet' />
            
                <div className={ 'box-container ' }>
                    <div className={'pkm-box '}>
                        <div className='highlight1' />
                        <div className='highlight2' />
                        <div className='sprite-container'>
                            <div className='shadow' />
                        </div>
                    </div>

                    <div className='pokesprite-container'>
                        <div className='sprite-div'>
                        
                        <img src={require('./images/frontSprites/' + props.pkmId + imgExtension)} id={props.pkmId} className='sprite' alt="pkm"/>

                        </div>
                    </div>

                    <div className='name-container'>
                        <div className='pkm-name'>{props.name}</div>
                    </div>
                    <div className='type-container'>
                        <div className='type-1-container'>
                            <div className={'type-box-1 ' + props.type1} />
                            <div className={'type-box-1H ' + props.type1} />
                            <div className={'type-box-1S ' + props.type1} />
                        </div>
                        <div className='type-2-container'>
                            <div className={'type-box-2 ' + typeColor(props)} />
                            <div className={'type-box-2H ' + typeColor(props)} />
                            <div className={'type-box-2S ' + typeColor(props)} />
                        </div>
                    </div>
                    <div className='num-container'>
                        <div className='pkm-num'>{padNum(props.dexNum)}</div>
                    </div>

                </div>

            <div className={ 'shadow-container ' }>
                <div className='box-shadow' />
            </div>

        </div>
    );
}

const getGradientStr = (color1, color2) => {
    return "linear-gradient(" + color1 + ", " + color2 + ")";
}


const StatBar = (props) => {

    const maxStatScale = 150;
    const maxBarHeight = 145;
    let barStyle;
    const darkred = "#db1017";
    const lightred = "#ff430c";
    const orange = "#ff8010";
    const yellow = "#ffc70f";
    const lightgreen = "#3bd424";
    const darkgreen = "#bce725";
    let gradient = getGradientStr(darkgreen, lightgreen);
    if (props.stat < 50) {
        gradient = getGradientStr(lightred, darkred);
    }
    else if (props.stat < 90) {
        gradient = getGradientStr(yellow, orange);
    }

    const barStyleOpened = {
        height: (Math.min(props.stat, maxStatScale) / maxStatScale * maxBarHeight) + "px",
        backgroundImage: gradient,
        transition: "height 0.5s"
    };

    const barStyleClosed = {
        height: "0px",
        backgroundImage: getGradientStr(lightred, darkred)
    };

    if (props.focus === "view-focus") {
        barStyle = barStyleOpened;
    }
    else {
        barStyle = barStyleClosed;
    }

    return (
        <div className='stat-bar-container'>
            <div className='stat-bar' style={barStyle}><div className='stat-text'>{props.stat}</div></div>
        </div>
    );
}


const StatBox = (props) => {

    const { height, width } = useWindowDimensions();

    let position = "";
    let direction = "";
    let dexEntryStr = "";
    let numberPerRow = 7;
    let middleLow = 2;
    let middleHigh = 4;

    if (width <= 480) {
        numberPerRow = 3;
        middleLow = 1;
        middleHigh = 1;
    }

    //Determine top/bottom position
    if (props.index < 90) {
        direction = " bottom";
    }
    else {
        direction = " top";
    }

    //Determine left/right position
    if (parseInt(props.index) % numberPerRow > middleHigh) {
        position = " left";
    }
    else if (parseInt(props.index) % numberPerRow < middleLow) {
        position = " right";
    }
    else {
        position = " center";
    }
    if (props.focus === "view-focus") {
        dexEntryStr = props.dexEntry.replace("Pok\u201amon", "Pok\u00e9mon").trim();
        const dexEntryArr = dexEntryStr.split(".");
        dexEntryStr = "";
        for (let i = 0; i < dexEntryArr.length-1; i++) {
            if ((dexEntryStr + dexEntryArr[i]).length < 130 || i == 0) {
                dexEntryStr += dexEntryArr[i] + ". "
            }
            else {
                break;
            }
        }
        if (dexEntryStr.length > 130) {
            dexEntryStr = dexEntryStr.substring(0, 130)+"...";
        }
        if (dexEntryStr.length === 0) {
            dexEntryStr = "???";
        }
    }

    let abilityJSX = (<div>
                            <div className='ability-label'>Ability 1</div>
                            <div className='ability-text'>{props.ability1}</div>
                            <div className='ability-label'>Ability 2</div>
                            <div className='ability-text'>{props.ability2}</div>
                    </div>)
    if (props.ability2 === '') {
        abilityJSX = (<div>
                        <div className='ability-label'>Ability 1</div>
                        <div className='ability-text'>{props.ability1}</div>
                    </div>)
    }
    
    return (
        <div className={'stat-box-wrapper ' + props.focus + position + direction}>
            <div className={'arrow'+direction}></div>
            <div className='stat-box'>
                <div className='dexentry-container' focus={props.focus}>
                    <div className='dexentry-text'>{dexEntryStr}</div>
                </div>
                <div className='ability-container' focus={props.focus}>
                    <div className='ability-label'>Category</div>
                    <div className='ability-text'>{props.category}</div>
                    {abilityJSX}
                </div>
                <div className='stat-container'>
                    <StatBar stat={props.hp} focus={ props.focus }/>
                    <div className='stat-label'>HP</div>
                </div>
                <div className='stat-container'>
                    <StatBar stat={props.attack} focus={props.focus} />
                    <div className='stat-label'>Atk</div>
                </div>
                <div className='stat-container'>
                    <StatBar stat={props.defense} focus={props.focus} />
                    <div className='stat-label'>Def</div>
                </div>
                <div className='stat-container'>
                    <StatBar stat={props.spAttack} focus={props.focus} />
                    <div className='stat-label'><sup><i>Sp</i></sup><div>Atk</div></div>
                </div>
                <div className='stat-container'>
                    <StatBar stat={props.spDefense} focus={props.focus} />
                    <div className='stat-label'><sup><i>Sp</i></sup><div>Def</div></div>
                </div>
                <div className='stat-container'>
                    <StatBar stat={props.speed} focus={props.focus} />
                    <div className='stat-label'>Spe</div>
                </div>
                
            </div>
        </div>
    );
}


export default function PokeBox(props) {

    const [loading, setLoading] = React.useState(false);

    return (
        <div>
            <RenderedBox {...props} />
            <StatBox {...props} />
        </div>
    );
}
import React, { useRef, useCallback } from 'react';


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



function renderBlank() {
    return (
        <div>
        </div>
    );
}

const RenderedBox = (props) => {
    

    return (
        <div className={ props.focus } onClick={useCallback(() => props.focusFunc(props.pkmId), [props])}>
            <link href='https://fonts.googleapis.com/css?family=Electrolize' rel='stylesheet' />
            
                <div className={ 'boxContainer ' }>
                    <div className={'pkmBox '}>
                        <div className='highlight1' />
                        <div className='highlight2' />
                        <div className='spriteContainer'>
                            <div className='shadow' />
                        </div>
                    </div>

                    <div className='pokeSpriteContainer'>
                        <div className='spriteDiv'>
                        
                                <img src={require('./images/frontSprites/' + props.pkmId + '.png')} id={props.pkmId} className='sprite' alt="pkm"/>

                        </div>
                    </div>

                    <div className='nameContainer'>
                        <div className='pkmName'>{props.name}</div>
                    </div>
                    <div className='typeContainer'>
                        <div className='1Container'>
                            <div className={'typeBox1 ' + props.type1} />
                            <div className={'typeBox1H ' + props.type1} />
                            <div className={'typeBox1S ' + props.type1} />
                        </div>
                        <div className='2Container'>
                            <div className={'typeBox2 ' + typeColor(props)} />
                            <div className={'typeBox2H ' + typeColor(props)} />
                            <div className={'typeBox2S ' + typeColor(props)} />
                        </div>
                    </div>
                    <div className='numContainer'>
                        <div className='pkmNum'>{padNum(props.dexNum)}</div>
                    </div>

                </div>

            <div className={ 'shadowContainer ' }>
                <div className='boxShadow' />
            </div>

        </div>
    );
}

const styles = {
    width: "40px",
    height: "50px",
    backgroundColor: "green",
    marginLeft: "5px",
    borderRadius: "5px 5px 5px 5px"
};

const StatBar = (props) => {
    return (
        <div className='stat-bar'><div className='stat-text'>{ props.stat }</div></div>
    );
}

const StatBox = (props) => {

    return (
        <div className={'stat-box-wrapper ' + props.focus}>
            <div className='stat-box'>
                <div className='stat-container'>
                    <StatBar stat={props.hp} />
                    <div className='stat-label'>HP</div>
                </div>
                <div className='stat-container'>
                    <StatBar stat={props.attack} />
                    <div className='stat-label'>Atk</div>
                </div>
                <div className='stat-container'>
                    <StatBar stat={props.defense} />
                    <div className='stat-label'>Def</div>
                </div>
                <div className='stat-container'>
                    <StatBar stat={props.spAttack} />
                    <div className='stat-label'>Atk</div>
                </div>
                <div className='stat-container'>
                    <StatBar stat={props.spDefense} />
                    <div className='stat-label'>Def</div>
                </div>
                <div className='stat-container'>
                    <StatBar stat={props.speed} />
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
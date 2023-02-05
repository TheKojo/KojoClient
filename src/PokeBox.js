import React from 'react';
import './PokeBox.css';


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
        <div>
            <link href='https://fonts.googleapis.com/css?family=Electrolize' rel='stylesheet' />
            <div>
                <div className={'pkmBox '}>
                    <div className='highlight1' />
                    <div className='highlight2' />
                    <div className='spriteContainer'>
                        <div className='spriteDiv'>
                            <img src={require('./images/frontSprites/' + props.pkmId + '.png')} id={props.pkmId} className='sprite' title={props.pkmId} alt="pkm" />
                        </div>
                        <div className='shadow' />
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
            <div className='shadowContainer'>
                <div className='boxShadow' />
            </div>

        </div>
    );
}


export default function PokeBox(props) {

    const [loading, setLoading] = React.useState(false);

    return (
        <div>
            <RenderedBox {...props} />
        </div>
    );
}
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import PokeBox from './PokeBox';
import './PokeBox.css'; 
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import ReactCSSTransitionGroup from 'react-transition-group'; // ES6

const popover = (
    <Popover id="popover-basic">
        <Popover.Header as="h3">Popover right</Popover.Header>
        <Popover.Body>
            And here's some <strong>amazing</strong> content. It's very engaging.
            right?
        </Popover.Body>
    </Popover>
);


const styles = {
    display: "inline-table"
};

const Box = (props) => {
    return(
        <div style={{ opacity: props.opacity }}>
            <div>
                <div className={'pkm-box '}>
                    <div className='highlight1' />
                    <div className='highlight2' />
                    <div className='sprite-container'>
                        <div className='shadow' />
                        <div className='sprite-div'>
                            <Spinner style={{ position: 'relative', bottom: 10, color: '#435c66'}} />
                        </div>
                    </div>
                </div>
                <div className='name-container'>
                    <div className='pkm-name'></div>
                </div>
                <div className='num-container'>
                    <div className='pkm-num'>???</div>
                </div>
            </div>
            <div className='shadow-container'>
                <div className='box-shadow' />
            </div>
        </div>
    );
};

function renderLoading() {
    return (
        <div>
            <Box opacity={1} />
            <Box opacity={0.5} />
            <Box opacity={0.25} />
            <Box opacity={0.12} />
            <Box opacity={0.06} />
            <Box opacity={0.03} />
            <Box opacity={0.01} />
        </div>
    )
}

const RenderedPkm = (pkmList, target, focusFunction, focus, directList, indirectList) => {

    return (
        <div className='gallery-body'>
            <div>
                {pkmList.map((pkm, idx) => {
                    var focusStr = "";
                    if (focus === "") {
                        focusStr = "view-default";
                    }
                    else {
                        focusStr = "view-unfocus";
                    }
                    if (focus === pkm.pokemonId) {
                        focusStr = "view-focus";
                    }
                    else if (directList.includes(pkm.pokemonId)) {
                        focusStr = "view-directevo";
                    }
                    else if (indirectList.includes(pkm.pokemonId)) {
                        focusStr = "view-indirectevo";
                    }
                    return (
                        <div key={pkm.pokemonId} className="key-container" ref={target}  >
                            <PokeBox key={pkm.pokemonId} pkmId={pkm.pokemonId} name={pkm.name} type1={pkm.type1} type2={pkm.type2} dexNum={pkm.regionalNumber}
                                focusFunc={focusFunction} focus={focusStr}
                                hp={pkm.hp} attack={pkm.attack} defense={pkm.defense} spAttack={pkm.spAttack} spDefense={pkm.spDefense} speed={pkm.speed}
                                ability1={pkm.ability1} ability2={pkm.ability2} abilityH={pkm.ability3} dexEntry={pkm.dexEntry} category={pkm.category}
                                index={idx} />
                        </div>
                    )
                    })
                }
            </div>
        </div>
    );
}


 const postPoke = (poke) => {
    /*let test = 'DABBING '+poke.id;
    const response = fetch('https://localhost:7260/pokemon/postpkm?id='+test, {
        method: 'POST',
        body: JSON.stringify({ ID: test })
    }).then((response) => { console.log('API returned post response '+response.status) });
     console.log('running postPoke '+test);*/
}



    

export default function Gallery() {

    const [loading, setLoading] = useState(true);
    const [pkmList, setState] = useState([]);
    const [directEvoList, setDirectFamily] = useState([]);
    const [indirectEvoList, setIndirectFamily] = useState([]);
    const [focusedPoke, setFocusPoke] = useState("");
    const target = useRef(null);

    const showPokeDetail = (pokeId, arrIdx) => {
        //Turn off
        if (focusedPoke === pokeId) {
            setFocusPoke("");
            setDirectFamily([]);
            setIndirectFamily([]);
        }
        else {
            setFocusPoke(pokeId);
            setDirectFamily(pkmList[arrIdx].directFamily)
            setIndirectFamily(pkmList[arrIdx].indirectFamily)
        }
    }

    useEffect(() => {
        //console.log('Running effect...');
        async function populatePkm() {
            /*
            //console.log('Populating Pokemon...');
            //http://kojoapi-dev.eba-7kpauzwj.us-east-1.elasticbeanstalk.com/pokemon/getpkm?regionalonly=true
            //https://localhost:7260/pokemon/getpkm?regionalonly=true
            const response = await fetch('http://kojoapi-dev.eba-7kpauzwj.us-east-1.elasticbeanstalk.com/pokemon/getpkm?regionalonly=true').then((response) => {
                //if (response.status >= 400 && response.status < 600) {
                    console.log('Pkm API returned response '+response.status);
                //}
                return response;
            }).catch((error) => {
                console.log('Error trying to fetch GetPkm: ' + error);
            })*/
            try {
                const data = require('./data/pkmdata.json')//await response.json();
                setState(data);
                setLoading(false);
            }
            catch(error) {
                console.log('Error trying to fetch GetPkm: ' + error.message);
            }

        }
        if (loading) {
            populatePkm();
        }
    }, [loading, focusedPoke]);

    var contents;
    if (loading) {
        contents = renderLoading();
    }
    else {
        contents = RenderedPkm(pkmList, target, showPokeDetail, focusedPoke, directEvoList, indirectEvoList);
    }
    return (
        <div>
            {contents}
        </div>
    );
}
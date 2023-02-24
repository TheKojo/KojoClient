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
                <div className={'pkmBox '}>
                    <div className='highlight1' />
                    <div className='highlight2' />
                    <div className='spriteContainer'>
                        <div className='shadow' />
                        <div className='spriteDiv'>
                            <Spinner style={{ position: 'relative', bottom: 10, color: '#435c66'}} />
                        </div>
                    </div>
                </div>
                <div className='nameContainer'>
                    <div className='pkmName'></div>
                </div>
                <div className='numContainer'>
                    <div className='pkmNum'>???</div>
                </div>
            </div>
            <div className='shadowContainer'>
                <div className='boxShadow' />
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

const RenderedPkm = (pkmList, target, focusFunction, focus) => {

    return (
        <div className='galleryBody'>
            <div>
                {pkmList.map(pkm => (
                        <div key={pkm.id} className="keyContainer" ref={target}  >             
                        <PokeBox pkmId={pkm.id} name={pkm.name} type1={pkm.type1} type2={pkm.type2} dexNum={pkm.regionalNumber}
                            focusFunc={focusFunction} focus={focus === pkm.id ? "view-focus" : (focus === "" ? "view-default" : "view-unfocus")} />
                        </div>
                ))}
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
    const [focusedPoke, setFocusPoke] = useState("");
    const target = useRef(null);

    const showPokeDetail = (pokeId) => {
        if (focusedPoke === pokeId) {
            pokeId = "";
        }
        setFocusPoke(pokeId);
    }

    useEffect(() => {
        async function populatePkm() {
            const response = await fetch('https://localhost:7260/pokemon/getpkm?regionalonly=true').then((response) => {
                if (response.status >= 400 && response.status < 600) {
                    console.log('API returned response '+response.status);
                }
                return response;
            }).catch((error) => {
                console.log('Error trying to fetch GetPkm: ' + error);
            })
            const data = await response.json();
            setState(data);
            setLoading(false);
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
        contents = RenderedPkm(pkmList, target, showPokeDetail, focusedPoke);
    }
    return (
        <div>
            {contents}
        </div>
    );
}
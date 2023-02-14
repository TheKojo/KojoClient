import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import PokeBox from './PokeBox';
import './PokeBox.css'; 

const styles = {
    display: "inline-table"
};

const Box = (props) => {
    return(
        <div>
            <div style={{ opacity: props.opacity} }>
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

function renderPkm(pkmList) {
    return (
        <div className='galleryBody'>
            <div>
                {pkmList.map(pkm => (
                    <div key={pkm.id} >
                        <PokeBox pkmId={pkm.id} name={pkm.name} type1={pkm.type1} type2={pkm.type2} dexNum={pkm.regionalNumber} />
                    </div>
                ))}
            </div>
        </div>
    );
}



export default function Gallery() {

    const [loading, setLoading] = React.useState(true);
    const [pkmList, setState] = React.useState([]);

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
    });

    let contents = loading
        ? renderLoading()
        : renderPkm(pkmList);

    return (
        <div>
            {contents}
        </div>
    );
}
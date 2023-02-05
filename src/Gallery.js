import React, { useEffect } from 'react';
import PokeBox from './PokeBox';

function renderLoading() {
    return (
        <div>

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
            const response = await fetch('http://kojoapiexpress-env.eba-cppcapc3.us-east-1.elasticbeanstalk.com/pokemon/getpkm?regionalOnly=true').then((response) => {
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
import React, { Component } from 'react';
import logo from './images/logo.png';
import './Gallery.css';
import { PokeBox } from './PokeBox';

export class Gallery extends Component {
    static displayName = Gallery.name;

    constructor(props) {
        super(props);
        //this.state = { forecasts: [], loading: true };
        //var data = require('./data/pokemon.json');
        this.state = {
            pkmList: [],
            loading: true,
            spriteSample: ''
        };

        /*aws.config.setPromisesDependency();
        aws.config.update({
            accessKeyId: 'AKIA4OP5TUYDP7XMV4BA',
            secretAccessKey: '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',
            region: 'us-east-1'
        });

        const s3 = new aws.S3();
        const list = s3.listObjectsV2({
            Bucket: 'pspectrumbucket'
        }).promise()

        console.log('testtttt');*/
    }

    componentDidMount() {
        this.populatePkm();
        document.body.style.backgroundColor = "#435c66";
    }

    /*componentDidUpdate() {
        render();
    }*/

    static padNum(val) {
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

    static typeColor(val) {
        if (val.type2 === null || val.type2 === undefined || val.type2 === 'NONE' || val.type2 === '') {
            return val.type1;
        }
        else {
            return val.type2;
        }
    }

    static renderLoading() {
        return (
            <div>
                <link href='https://fonts.googleapis.com/css?family=Electrolize' rel='stylesheet' />
                <img src={logo} className='logo' alt='' />
            </div>
        )
    }

    static renderPkm(state) {
        return (
            <div className='galleryBody'>
                <link href='https://fonts.googleapis.com/css?family=Electrolize' rel='stylesheet' />
                <div>
                    <img src={logo} className='logo' alt=''/>
                    {state.pkmList.map(pkm => (
                        <div key={pkm.id} >
                            <PokeBox pkmId={pkm.id} name={pkm.name} type1={pkm.type1} type2={pkm.type2} dexNum={ pkm.regionalNumber } />
                        </div>
                    ))}

                </div>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? Gallery.renderLoading()
            : Gallery.renderPkm(this.state);

        return (
            <div>
                {contents}
            </div>
        );
    }


    async populatePkm() {
        const response = await fetch('https://kojoapi.azurewebsites.net/pokemon/getpkm');
        const data = await response.json();
        this.setState({ pkmList: data, loading: false, spriteSample: '' });
    }
}
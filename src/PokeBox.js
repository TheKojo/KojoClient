import React, { Component } from 'react';
import './PokeBox.css';

export class PokeBox extends Component {
    static displayName = PokeBox.name;

    constructor(props) {
        super(props);
        this.state = {
            pkmData: [],
            pkmId: props.pkmId,
            name: props.name,
            type1: props.type1,
            type2: props.type2,
            dexNum: props.dexNum,
            loading: true,
            spriteSample: ''
        };
    }

    componentDidMount() {
        //this.getPkmImage();
        this.setState({ spriteSample: '', loading: false })
    }

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

    static typeColor(state) {
        if (state.type2 === null || state.type2 === undefined || state.type2 === 'NONE' || state.type2 === '') {
            return state.type1;
        }
        else {
            return state.type2;
        }
    }

    static renderBlank() {
        return (
            <div>
            </div>
        );
    }

    static renderPkm(state) {
        return (        
            <div>
                <link href='https://fonts.googleapis.com/css?family=Electrolize' rel='stylesheet' />
                <div>
                    <div className={'pkmBox '}>
                        <div className='highlight1' />
                        <div className='highlight2' />
                        <div className='spriteContainer'>
                            <div className='spriteDiv'>
                                <img src={require('./images/frontSprites/' + state.pkmId + '.png')} id={state.pkmId} className='sprite' title={state.pkmId} alt="pkm" />
                            </div>
                            <div className='shadow' />
                        </div>
                    </div>

                    <div className='nameContainer'>
                        <div className='pkmName'>{state.name}</div>
                    </div>
                    <div className='typeContainer'>
                        <div className='1Container'>
                            <div className={'typeBox1 ' + state.type1} />
                            <div className={'typeBox1H ' + state.type1} />
                            <div className={'typeBox1S ' + state.type1} />
                        </div>
                        <div className='2Container'>
                            <div className={'typeBox2 ' + this.typeColor(state)} />
                            <div className={'typeBox2H ' + this.typeColor(state)} />
                            <div className={'typeBox2S ' + this.typeColor(state)} />
                        </div>
                    </div>
                    <div className='numContainer'>
                        <div className='pkmNum'>{this.padNum(state.dexNum)}</div>
                    </div>
                </div>
                <div className='shadowContainer'>
                    <div className='boxShadow' />
                </div>

            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? PokeBox.renderBlank()
            : PokeBox.renderPkm(this.state);
        return (
            <div>
                {contents}
            </div>
        );
    }



    async getPkmImage() {
        fetch('pokemon/getsprite?id=' + this.state.pkmId)
            .then(response => response.blob())
            .then(blob => {
                this.setState({ spriteSample: URL.createObjectURL(blob) , loading: false })
            })
    }
}
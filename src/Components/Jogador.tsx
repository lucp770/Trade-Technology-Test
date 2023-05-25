import React from 'react';
import userImage from './../user.png';

function Jogador(props:any){
    const {nome,idade, nacionalidade} = props;

    return (
    <div className='jogador-container'>

        <div className="player-pic">
            <img src={userImage}/>            
        </div>

        <div className="player-data">
            <div className="nome-container">
                <span>Nome: </span>
                <span>{nome}</span>
            </div>

            <div className="idade-container">
                <span>Idade: </span>
                <span>{idade}</span>
            </div>

            <div className="nacionalidade-container">
                <span>Nacionalidade: </span>
                <span>{nacionalidade}</span>
            </div>

        </div>

    </div>
    )
}


export default Jogador;

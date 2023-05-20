import React, {useRef, useState, useEffect} from 'react';
import { Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

async function APIKeyValid(apikey: string, userVerification:any, apiKeyDefinition:any, setLoading:any){

    setLoading(true);

    let myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", apikey);
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    const url = 'https://v3.football.api-sports.io/status';
    let valid:boolean;

    let requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders
    };

    // let valid = await fetch('./');
    let resultado:any = await fetch(url, requestOptions);
    resultado = await resultado.json();
    console.log({resultado});

    if(resultado.results ==1){
        setLoading(false);
        apiKeyDefinition(apikey);
        userVerification(true);
    }else{
        setLoading(false);
        alert('chave API invalida');
        userVerification(false);
    }
}

function Login(props:any){
    //cria uma referencia para o input usado para digitar a chave API.
    const {userVerification, apiKeyDefinition} = props;
    const [Loading, setLoading] = useState(false);

    const apiKeyInput:any = useRef();

    return(
        <>
        <div className="main-container">

            <h2> Bem Vindo ao <span className='app-title'>Meu Time</span></h2>
            <h3>O aplicativo favorito dos torcedores fieis</h3>
            
            <p>Insira abaixo a chave API obtida da <a href='https://www.api-football.com/documentation-v3'>API-footbal</a>
            </p>

            <div className='login-container'>

                <div className="input-container">
                    <label htmlFor="api-key-input">Chave API:</label>
                    <input type='text' ref={apiKeyInput} />
                </div>

                <button className='login-btn' onClick={()=>{APIKeyValid(apiKeyInput.current.value, userVerification, apiKeyDefinition, setLoading)}}>Entrar</button>
            </div>
        </div>
        {Loading?
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open >
            <CircularProgress color="inherit" />
        </Backdrop> :null  }
        </>
    )
}

export default Login;
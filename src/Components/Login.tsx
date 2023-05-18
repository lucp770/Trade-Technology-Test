import React from 'react';

async function APIKeyValid():Promise<Boolean> {

    let valid = await fetch('./');
    
    if(valid){
        return true;
    }else{
        return false;
    }
}

function Login(){

    return(
        <div className="login-container">
            <h2> Bem Vindo ao Meu Time</h2>
            <p>
                Insira abaixo a chave API obtida da <a href='https://www.api-football.com/documentation-v3'>API-footbal</a>
            </p>
            <form>
                <label htmlFor="api-key-input">Chave API:</label>
                <input type='text'/>
                <button className='login-btn'>Login</button>
            </form>
        </div>
    )
}


export default Login;
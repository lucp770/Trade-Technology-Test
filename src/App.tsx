import React, {useEffect, useState, Dispatch, SetStateAction} from 'react';
import Login from './Components/Login';
import SelectionPage from './Components/SelectionPage';
import logo from './logo.svg';
import './App.css';

function App() {
  const [userLogged, setUserLogged] = useState(false);//ao carregar a pagina o usuario não esta logado.
  const [APIKey, setAPIKey] = useState('');

  // se userLogged, mostrar a tela de consulta, se não mostrar a tela de Login
  let userVerification:Dispatch<SetStateAction<boolean>>;
  let apiKeyDefinition:Dispatch<SetStateAction<string>>;
  let apiKey:string;

  return (
    <div className="App">
      {userLogged ? (
        <SelectionPage apiKey = {APIKey} />
        ) : (<Login userVerification = {(value:boolean) => setUserLogged(value)} apiKeyDefinition ={(apiKey: string)=> setAPIKey(apiKey)}/>)}
    </div>);

}

export default App;

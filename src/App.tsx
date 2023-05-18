import React, {useEffect, useState} from 'react';
import Login from './Components/Login';
import SelectionPage from './Components/SelectionPage';
import logo from './logo.svg';
import './App.css';

function App() {
  const [userLogged, setUserLogged] = useState(false);//ao carregar a pagina o usuario não esta logado.
  // se userLogged, mostrar a tela de consulta, se não mostrar a tela de Login

  return (
    <div className="App">
      {userLogged ? (
        <SelectionPage />
        ) : (<Login/>)}
    </div>);

}

export default App;

import React,{useEffect,useState} from 'react';

function SelectionPage(props:any){
    const [Countries, setContries] = useState([]);

    const [Country, setCountry] = useState('');
    const [Temporada, setTemporada] = useState('');
    const [Liga, setLiga] = useState('');
    const [time,setTime] = useState('');
    
    const {apiKey} = props;

    let myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", apiKey);
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    const urlContries = 'https://v3.football.api-sports.io/countries';

    let requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders
    };

    useEffect(()=>{
        // Get the list of countries on the first renders.
         // fetch the list of countries.
         fetch(urlContries,requestOptions)
         .then((countriesList:Response) => countriesList.json())
         .then(jsonResponse => jsonResponse.response)
         .then(responseArray => setContries(responseArray));
    },[])

    useEffect(()=>{
        // rerender the elment when a new country is selected.
        console.log(`Pais selecionado : ${Country}`);
        // tornar inativo os elementos que não foram selecionados.

    },[Country]);

    return(
        <div className="selection-page-container">
            <div className="options-container">
                <span>Selecione o País: </span>
                <select className='country-select'>
                </select>

                <span>Selecione a liga: </span>
                <select className='liga-select'></select>


                <span>Selecione o time: </span>
                <select className='country-select'></select>
            </div>

            <div className="players-list-container">

            </div>
        </div>
    );
}

export default SelectionPage;


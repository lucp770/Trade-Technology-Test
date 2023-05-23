import React,{useEffect,useState, useRef} from 'react';


function pesquisar(Pais:string, liga:string, time:string, opcao:string, temporada?:string){
    // switch case opcao{
    console.log('Pesquisar');
}

function SelectionPage(props:any){

    const [Countries, setContries] = useState([]);
    const [Ligas, setLigas] = useState([]);
    const [Seasons, setSeasons] = useState([]);

    const [Country, setCountry] = useState('');
    const [Season, setSeason] = useState('nenhuma');
    const [Temporada, setTemporada] = useState('');
    const [Liga, setLiga] = useState('');
    const [time,setTime] = useState('');

    const timeRef = useRef();
    const opcaoDeConsulta = useRef();

    
    const {apiKey} = props;
    console.log({apiKey});

    const urlContries = 'https://v3.football.api-sports.io/countries';

    let myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", apiKey);
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    let requestOptions: RequestInit = {
        method: 'GET',
        headers: {"x-rapidapi-key": apiKey,"x-rapidapi-host": "v3.football.api-sports.io"}
        };

    useEffect(()=>{

        // const urlContries = 'https://v3.football.api-sports.io/countries';
        // let requestOptions: RequestInit = {
        //     method: 'GET',
        //     headers: {"x-rapidapi-key": apiKey}
        // };
        console.log({requestOptions});
        // Get the list of countries on the first renders.
         // fetch the list of countries.
         fetch(urlContries,requestOptions)
         .then((countriesList:Response) => countriesList.json())
         .then(jsonResponse => jsonResponse.response)
         .then(responseArray =>{
            setContries(responseArray)
            let firstCountry:string = responseArray[0].name;
            return fetch(`https://v3.football.api-sports.io/leagues?country=${firstCountry}`,requestOptions)
        })
        .then(resultado => resultado.json())
        .then(resultadoJson => resultadoJson.response)
        .then(arrayResultados => setLigas(arrayResultados))
        .catch(e=> alert(`Erro ao acessar a API: ${e}`));

    },[])

    useEffect(()=>{
        // let myHeaders = new Headers();
        // myHeaders.append("x-rapidapi-key", apiKey);
        // myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

        // const urlContries = 'https://v3.football.api-sports.io/countries';

        // let requestOptions: RequestInit = {
        //     method: 'GET',
        //     headers: {"x-rapidapi-key": apiKey,"x-rapidapi-host": "v3.football.api-sports.io"}
        // };
        // rerender the elment when a new country is selected.
        console.log(`Pais selecionado : ${Country}`);
        // tornar inativo os elementos que não foram selecionados.

        // consultar as ligas referentes àquele País.
        fetch(`https://v3.football.api-sports.io/leagues?country=${Country}`,requestOptions)
            .then(resultado=> resultado.json())
            .then(resultadoJson => resultadoJson.response)
            .then(arrayResultados => setLigas(arrayResultados))
            .catch(e=> alert(`Erro ao acessar a API: ${e}`));
    },[Country]);

    useEffect(()=>{
        // Se for escolhida uma season é preciso atualizar os resultados de ligas e times.
        if(Season !== 'nenhuma'){
            // consultar as ligas referentes àquele País e àquela temporada
        fetch(`https://v3.football.api-sports.io/leagues?country=${Country}&season=${Season}`,requestOptions)
            .then(resultado=> resultado.json())
            .then(resultadoJson => resultadoJson.response)
            .then(arrayResultados => setLigas(arrayResultados))
            .catch(e=> alert(`Erro ao acessar a API: ${e}`));
        }
    },[Season]);


    return(
        <div className="selection-page-container">
            <div className="options-container">
                <h3>Opções de Consulta</h3>

                <div className="select-container">

                    <div className="pais-container">
                        <span>Selecione o País: </span>
                        <select className='country-select' onChange={(eventChange) => setCountry(eventChange.target.value)}>
                            {Countries.map((country:any)=>(<option key={Countries.indexOf((country as never))}>{country.name}</option>))}
                        </select>
                    </div>

                    <div className="liga-container">
                        <span>Selecione a liga: </span>
                        <select className='liga-select'>
                            {Ligas.map((liga:any)=>(<option key={Ligas.indexOf((liga as never))}>{liga.league.name}</option>))}
                        </select>
                    </div>
                
                    <div className="temporada-container">
                         <span>Selecione uma temporada (Opicional): </span>

                        <select className='season-select'>
                            <option value='nenhuma'>Selecionar...</option>
                            {Seasons.map((season:any)=>(<option key={Seasons.indexOf((season as never))}>{season}</option>))}
                        </select>
                    </div>

                    <div className="temporada-container">
                        <span>Selecione o time: </span>
                        <select className='country-select'></select>
                    </div>

                </div>

                <div className="radio-btns-container">
                    <h3>Selecione o dado que deseja consultar</h3>

                    <form className="opcoes-de-constulta-form">
                        <div className='opcao-container'>
                            <input name='opcao' type='radio' id='jogadores' value='jogadores'/>
                            <label htmlFor='jogadores'>Jogadores</label>
                        </div>

                        <div className='opcao-container'>
                            <input name='opcao' type='radio' id='formacao' value='formacao'/>
                            <label htmlFor='formacao'>Formação mais utilizada</label>
                        </div>


                        <div className='opcao-container'>
                            <input name='opcao' type='radio' id='resultados'value='resultados'/>
                            <label htmlFor='resultados'>Resultados</label>
                        </div>


                        <div className='opcao-container'>
                            <input name='opcao' type='radio' id='gols' value='gols'/>
                            <label htmlFor='gols'>Gols marcados por tempo de jogo</label>
                        </div>

                    </form>
                </div>

                <div className="consultar-btn-container">
                    <button className = "consultar-btn">Consultar</button>
                </div>

            </div>

            <div className="results-container">
            </div>
        </div>
    );
}

export default SelectionPage;


// mais infos: https://stackoverflow.com/questions/62624783/radio-ref-on-react

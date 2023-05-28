import React,{useEffect,useState, useRef} from 'react';
import Jogador from './Jogador';
import Grafico from './Grafico';


function SelectionPage(props:any){

    const [opcaoDeBusca, setOpcaoDeBusca] = useState('nenhuma');

    const [Countries, setContries] = useState([]);
    const [Ligas, setLigas] = useState([]);
    const [Seasons, setSeasons] = useState([]);
    const [times, setTimes] = useState([]);

    const [Country, setCountry] = useState('none');
    const [Season, setSeason] = useState('none');
    const [Liga, setLiga] = useState('none');
    const [time,setTime] = useState('none');

    const [Jogadores, setJogadores] = useState([{nome:'Lucas', idade:26, nacionalidade:'Brasileiro' }, {nome:'Vitor', idade: 20, nacionalidade:'Brasileiro'}]);


    const timeRef = useRef();
    const opcaoDeConsulta = useRef();

    // selects
    const ligaSelect = useRef() as React.MutableRefObject<HTMLSelectElement>;
    const seasonSelect = useRef() as React.MutableRefObject<HTMLSelectElement>;
    const timeSelect = useRef() as React.MutableRefObject<HTMLSelectElement>;


    // radio buttons
    const radioJogadores = useRef() as React.MutableRefObject<HTMLInputElement>;
    const radioResultado = useRef() as React.MutableRefObject<HTMLInputElement>;
    const radioGolsMarcados = useRef() as React.MutableRefObject<HTMLInputElement>;
    const radioFormacao = useRef() as React.MutableRefObject<HTMLInputElement>;


    // Props
    const {apiKey,userVerification} = props;
    console.log({apiKey});

    const urlContries = 'https://v3.football.api-sports.io/countries';

    let myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", apiKey);
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    let requestOptions: RequestInit = {
        method: 'GET',
        headers: {"x-rapidapi-key": apiKey,"x-rapidapi-host": "v3.football.api-sports.io"}
        };

    function checarOpcaoSelecionada(){
        if(radioFormacao.current.checked){
            alert('formacao');
            // fetch com os dados selecionados
            console.log({time,Country, Liga, Season});

        }else if(radioJogadores.current.checked){
            alert('Jogadores');
        }else if(radioResultado.current.checked){
            alert('Resultado');
        }else if(radioGolsMarcados.current.checked){
            alert('Gols Marcados')
        }else{
            alert('Por favor selecione uma opção de consulta');
        }

    }
        

    function mostrarResultadoDaBusca(opcao:string,Pais?:string, liga?:string, time?:string , temporada?:string):any {
        // switch case opcao{
        console.log('Pesquisar');
        // set busca

        if(opcao == 'nenhuma'){
            return (<p>Hello world</p>)
        }else if(opcao=='jogadores'){
            return(<div>
                {Jogadores.map((jogador:any)=>(<Jogador nome={jogador.nome} idade={jogador.idade} nacionalidade={jogador.nacionalidade}/>))}
                </div>
                )
        
        }
    

}

    // first render, fetch the list of countries and the available seasons

    useEffect(()=>{
        fetch(urlContries,requestOptions)
         .then((countriesList:Response) => countriesList.json())
         .then(jsonResponse => jsonResponse.response)
         .then(responseArray => setContries(responseArray))
         .then(()=>{
            return fetch('https://v3.football.api-sports.io/leagues/seasons', requestOptions)
         })
         .then((response:Response)=> response.json())
         .then(jsonResponse => setSeasons(jsonResponse.response))
         .catch(e=>alert(e))
    },[])


    // rerender when country selected

    useEffect(()=>{

        if(Country !== 'none'){
            // fetch the Leagues
            fetch(`https://v3.football.api-sports.io/leagues?country=${Country}`,requestOptions)
                .then((response:Response)=> response.json())
                .then(jsonResponse=>setLigas(jsonResponse.response))
                .then(()=>{
                    // enable liga selection
                    ligaSelect.current.disabled=false;

                    if(ligaSelect.current.classList.contains('inactive')){
                        ligaSelect.current.classList.remove('inactive');
                    }
                })
        }else{
            // disable liga selection
            ligaSelect.current.disabled=true;
            if(!ligaSelect.current.classList.contains('inactive')){
                ligaSelect.current.classList.add('inactive');
            }

        }

    },[Country])

    // rerender if/when a season is selected
    useEffect(()=>{
        if(Season !== 'none'){
            fetch(`https://v3.football.api-sports.io/leagues?country=${Country}&season=${Season}`,requestOptions)
            .then(resultado=> resultado.json())
            .then(resultadoJson => resultadoJson.response)
            .then(arrayResultados => {
                setLigas(arrayResultados)})
            .catch(e=> alert(`Erro ao acessar a API: ${e}`));
        }else{

    }

    }, [Season])

    // rerender when Liga selected, and make time selection available
    useEffect(()=>{
        if(Liga !== 'none'){
            // fetch the teams

            let ligaId = Ligas.find((liga:any) => liga.league.name = Liga);
            console.log({ligaId})


            // make time SelectionPagetion available
            timeSelect.current.disabled=false;

            if(timeSelect.current.classList.contains('inactive')){
                timeSelect.current.classList.remove('inactive');
            }
        }else{
            // make time selection unavailable
            timeSelect.current.disabled=true;
            if(!timeSelect.current.classList.contains('inactive')){
                timeSelect.current.classList.add('inactive');
            }

        }

    },[Liga])

    

    // useEffect(()=>{

    //     console.log({requestOptions});

    //      // fetch the list of countries.
    //      fetch(urlContries,requestOptions)
    //      .then((countriesList:Response) => countriesList.json())
    //      .then(jsonResponse => jsonResponse.response)
    //      .then(responseArray =>{
    //         setContries(responseArray)
    //         let firstCountry:string = responseArray[0].name;
    //         return fetch(`https://v3.football.api-sports.io/leagues?country=${firstCountry}`,requestOptions)
    //     })
    //     .then((resultado:Response) => resultado.json())
    //     .then(resultadoJson => resultadoJson.response)
    //     .then(arrayResultados => setLigas(arrayResultados))
    //     .then(()=>{
    //         // fetch the seasons.
    //         return fetch('https://v3.football.api-sports.io/leagues/seasons', requestOptions)
    //     })
    //     .then(result => result.json())
    //     .then(resultJson => {
    //         console.log('seasons: ');
    //         console.log({resultJson});
    //         setSeasons(resultJson.response)})
    //     .then(()=>{
    //         // fetch the Teams
    //         console.log('fetching teams...');

    //     })
    //     .catch(e=> {
    //         alert(`Erro ao acessar a API: ${e}`)});
    //         // userVerification(false);

    // },[])

    // useEffect(()=>{
       
    //     fetch(`https://v3.football.api-sports.io/leagues?country=${Country}`,requestOptions)
    //         .then(resultado=> resultado.json())
    //         .then(resultadoJson => resultadoJson.response)
    //         .then(arrayResultados => setLigas(arrayResultados))
    //         .catch(e=> alert(`Erro ao acessar a API: ${e}`));
    // },[Country]);

    // useEffect(()=>{
    //     // Se for escolhida uma season é preciso atualizar os resultados de ligas e times.
    //     if(Season !== 'nenhuma'){
    //         // consultar as ligas referentes àquele País e àquela temporada
    //     fetch(`https://v3.football.api-sports.io/leagues?country=${Country}&season=${Season}`,requestOptions)
    //         .then(resultado=> resultado.json())
    //         .then(resultadoJson => resultadoJson.response)
    //         .then(arrayResultados => {
    //             console.log({arrayResultados});
    //             setLigas(arrayResultados)})
    //         .catch(e=> alert(`Erro ao acessar a API: ${e}`));
            
    //     }else{
    //         fetch(`https://v3.football.api-sports.io/leagues?country=${Country}`,requestOptions)
    //         .then(resultado=> resultado.json())
    //         .then(resultadoJson => resultadoJson.response)
    //         .then(arrayResultados => {
    //             console.log({arrayResultados});
    //             setLigas(arrayResultados)})
    //         .catch(e=> alert(`Erro ao acessar a API: ${e}`));
    //     }
    // },[Season]);


    return(
        <div className="selection-page-container">
            <div className="options-container">
                <h3>Opções de Consulta</h3>

                <div className="select-container">

                    <div className="pais-container">
                        <span>Selecione o País: </span>
                        <select className='country-select' onChange={(eventChange) => setCountry(eventChange.target.value)}>
                             <option value='none'>Selecionar...</option>
                            {Countries.map((country:any)=>(<option key={Countries.indexOf((country as never))}>{country.name}</option>))}
                        </select>
                    </div>

                    <div className="liga-container">
                        <span>Selecione a liga: </span>
                        <select className='liga-select inactive' ref={ligaSelect} onChange={(eventChange) => setLiga(eventChange.target.value)} disabled>
                            <option value='none'>Selecionar...</option>
                            {Ligas.map((liga:any)=>(<option key={Ligas.indexOf((liga as never))}>{liga.league.name}</option>))}
                        </select>
                    </div>
                
                    <div className="temporada-container">
                         <span>Selecione uma temporada (Opicional): </span>

                        <select className='season-select' ref={seasonSelect} onChange={(eventChange) => setSeason(eventChange.target.value)}>
                            <option value='none'>Selecionar...</option>
                            {Seasons.map((season:any)=>(<option key={Seasons.indexOf((season as never))} value={season}>{season}</option>))}
                        </select>
                    </div>

                    <div className="temporada-container">
                        <span>Selecione o time: </span>
                        <select className='inactive time-select ' ref={timeSelect} disabled>
                            <option value='none'>Selecionar...</option>
                        </select>
                    </div>

                </div>

                <div className="radio-btns-container">
                    <h3>Selecione o dado que deseja consultar</h3>

                    <form className="opcoes-de-constulta-form">
                        <div className='opcao-container'>
                            <input name='opcao' type='radio' id='jogadores' value='jogadores' ref ={radioJogadores} />
                            <label htmlFor='jogadores'>Jogadores</label>
                        </div>

                        <div className='opcao-container'>
                            <input name='opcao' type='radio' id='formacao' value='formacao' ref ={radioFormacao}/>
                            <label htmlFor='formacao'>Formação mais utilizada</label>
                        </div>


                        <div className='opcao-container'>
                            <input name='opcao' type='radio' id='resultados'value='resultados' ref ={radioResultado}/>
                            <label htmlFor='resultados'>Resultados</label>
                        </div>


                        <div className='opcao-container'>
                            <input name='opcao' type='radio' id='gols' value='gols' ref ={radioGolsMarcados}/>
                            <label htmlFor='gols'>Gols marcados por tempo de jogo</label>
                        </div>

                    </form>
                </div>

                <div className="consultar-btn-container">
                    <button className = "consultar-btn" onClick ={()=>{checarOpcaoSelecionada()}}>Consultar</button>
                </div>

            </div>

            <div className="results-container">
                {mostrarResultadoDaBusca(opcaoDeBusca,Country, Liga, time)}
            </div>
        </div>
    );
}

export default SelectionPage;

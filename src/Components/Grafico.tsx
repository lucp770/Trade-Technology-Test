import React from 'react';
import Plot from 'react-plotly.js';



function Grafico(props:any){

    return(
        <div className='plot-container'>
            <Plot
            data={[

                {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                
            ]}
            
            layout={ 
                {width: 600, height: 320,  title: 'A Fancy Plot'}
                
                }

            />
        </div>
    )
}


export default Grafico;

/*
s

*/
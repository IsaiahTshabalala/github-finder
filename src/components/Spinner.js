/**
 File: ./src/components/Spinner.js
 Date       Dev  Version  Patch
 2023/07/20 ITA  1.01     Remove import of Spinner.png as it is no longer used.
 */
function Spinner() {

    return (
        <div className='m-5 container-fluid'>
            <p>Loading data ... please wait.</p>
            <div className="spinner-grow text-dark m-1 foat-start"></div>
            <div  className="spinner-grow text-dark m-1 foat-start"></div>    
            <div  className="spinner-grow text-dark m-1 foat-start"></div>
        </div>
    );

}

export default Spinner;
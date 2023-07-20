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
import React, { useState } from "react";
import '../buttons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import sadCat from '../Immagini/sadCat.jpg'

const Youtube = () => {
    let videoList = connect();

    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);

        if (searchInput !== '') {
            const filteredData = videoList.filter((item) => {
                return Object.values(item.snippet.title).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(videoList);
        }
    }

    if (videoList == "error") {
        return (
            <div>
                <br></br>
                <h1>Hai superato il limite di richieste giornaliere!</h1>
                <h1>Effettua l'abbonamento per poter continuare a vedere i video!</h1>
                <br></br>
                <img src={sadCat} width='50%' className="centered"></img>
            </div>
        )
    }
    videoList = videoList.items;
    let ytLink = "https://www.youtube.com/watch?v=";

    return (
        <div>
            <div id="youtubeBody" className="container mt-5">
                <h1>Video divertenti</h1>
                <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Cerca"
                        onChange={(e) => searchItems(e.target.value)}
                    />
                    {/* <button className="c3-search" type="submit">Cerca</button> */}
                </form>


                <div className="card-fuori">
                    {
                        searchInput.length > 1 ?
                            filteredResults.map((element) => (
                                <div className="bordo" key={element.id.videoId}>

                                    <div className="bordo">
                                        <img src={element.snippet.thumbnails.high.url} className="" alt="..."></img>

                                        <h5 className="card-title">{element.snippet.title}</h5>
                                        <p className="card-text">{element.snippet.channelTitle}</p>
                                        <a href={ytLink + element.id.videoId} className="btn btn-outline-primary">Guarda il video</a>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted">{formatDate(element.snippet.publishedAt)}</small>
                                    </div>
                                </div>

                            )) :
                            videoList.map((element) => (
                                <div className="bordo" key={element.id.videoId}>

                                    <div className="">
                                        <img src={element.snippet.thumbnails.high.url} className="" alt="..."></img>

                                        <h5 className="card-title">{element.snippet.title}</h5>
                                        <p className="card-text">{element.snippet.channelTitle}</p>
                                        <a href={ytLink + element.id.videoId} className="btn btn-outline-primary">Guarda il video</a>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted">{formatDate(element.snippet.publishedAt)}</small>
                                    </div>

                                </div>
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

function connect() {
    //API_KEY => AIzaSyC11EwTLWAtkam-iQP7tZ-zw-9HVAoeiKs
    let myRequest = new XMLHttpRequest();
    myRequest.open("GET", "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=funny%20animals&key=AIzaSyC11EwTLWAtkam-iQP7tZ-zw-9HVAoeiKs", false);
    myRequest.send("null");

    if (myRequest.status == 200) {
        let response = myRequest.responseText;
        response = JSON.parse(response);

        return (
            { response }.response
        )
    } else {
        return ("error")
    }
}

function formatDate(rawDate) {
    let dataMillisec = Date.parse(rawDate);
    let dataFormattata = new Date(dataMillisec).toUTCString();

    return (
        dataFormattata
    )
}

export default Youtube;
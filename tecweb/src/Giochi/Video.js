import React, { useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

const Youtube = () => {
    let videoList = connect();
    
    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);

        if(searchInput !== '') {
            const filteredData = videoList.filter((item) => {
                return Object.values(item.snippet.title).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(videoList);
        }
    }

    if(videoList == "error"){
        return(
            <div>
  
                <h1>ERROR</h1>
            </div>
        )
    }
    videoList = videoList.items;
    let ytLink = "https://www.youtube.com/watch?v=";

    return(
        <div>

            
            <div id="youtubeBody" className="container mt-5">
                <h1>Video migliori della settimana</h1>
                <div className="d-flex justify-content-evenly align-items-center flex-wrap gap-3 my-5">
                        <iframe 
                            height="200"
                            src="https://www.youtube.com/embed/2Gw4K7oqK08" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>    
                        </iframe>
                        <iframe 
                            height="200"
                            src="https://www.youtube.com/embed/GiTLCqT8pL4" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe>
                        <iframe 
                            height="200"
                            src="https://www.youtube.com/embed/jenVMnOi2uA"
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe>
                </div>
                <h1>Video divertenti</h1>
                <form className="d-flex my-5" role="search" onSubmit={(e) => e.preventDefault()}>
                    <input 
                        className="form-control me-2" 
                        type="search" 
                        placeholder="Search" 
                        aria-label="Search"
                        onChange={(e) => searchItems(e.target.value)}
                    />
                    <button className="btn btn-outline-success" type="submit">Search</button>
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

function connect(){
    //API_KEY => AIzaSyC11EwTLWAtkam-iQP7tZ-zw-9HVAoeiKs
    let myRequest = new XMLHttpRequest();
    myRequest.open("GET", "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=funny%20animals&key=AIzaSyC11EwTLWAtkam-iQP7tZ-zw-9HVAoeiKs", false);
    myRequest.send("null");

    if(myRequest.status == 200){
        let response = myRequest.responseText; 
        response = JSON.parse(response);

        return(
            {response}.response
        )
    }else{
        return("error")
    }
}

function formatDate(rawDate){
    let dataMillisec = Date.parse(rawDate);
    let dataFormattata = new Date(dataMillisec).toUTCString();

    return(
        dataFormattata
    )
}

export default Youtube;
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./notiziaStyle.css"
import '../buttons.css'

const AnimalNews = () => {
    let newsArray = connect();

    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    const NewsCard = (props) => {
        return (
            <div className="notizia" key={props.element.url}>
                <div className="card-body">
                    <div className="float-end ms-5 p-3" style={imageContainerStyle}>
                        <img src={props.element.urlToImage} style={imageStyle} alt=''></img>
                    </div>
                    <h5 className="card-title">{props.element.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{formatDate(props.element.publishedAt)}</h6>
                    <p className="card-text">{props.element.content}</p>
                    <a
                        href={props.element.url}
                        className="btn btn-outline-primary fs-5" target={'_blank'}>
                        Continua a leggere
                    </a>
                </div>
            </div>
        )
    }

    const imageStyle = {
        width: "100%",
        height: "100%",
        objectFit: "contain",
    }

    const imageContainerStyle = {
        width: "30%",
        height: "100%",
        margin: "1rem"
    }

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);

        if (searchInput !== '') {
            const filteredData = newsArray.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(newsArray);
        }
    }

    return (
        <div id="News" className="container">
            <h1>Notizie sugli animali</h1>
            <form className="d-flex my-3" role="search" onSubmit={(e) => e.preventDefault()}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Cerca.."
                    aria-label="Search"
                    onChange={(e) => searchItems(e.target.value)}
                /> 
                {/* <button className="c3-play" type="submit">Cerca</button> */}
               
            </form>
            <div className="d-flex flex-column flex-wrap">
                {
                    searchInput.length > 1 ?
                        filteredResults
                            .map((element, index) => (
                                <NewsCard key={index} element={element} />
                            )) :
                        newsArray
                            .slice(0, 10)
                            .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
                            .map((element, index) => (
                                <NewsCard key={index} element={element} />
                            ))
                }

            </div>
        </div>
    )
}

function connect() {
    //API_KEY -> 2c965b0e26694da49d9b0ecbdbb41348
    let myConnection = new XMLHttpRequest();
    myConnection.open("GET", "https://newsapi.org/v2/everything?q=animal&apiKey=8739329819f94fcfbbef4893bb9fd32a", false);
    myConnection.send("null");
    let response = myConnection.responseText;

    return (
        showNews(response).data
    )
}

function showNews(rawData) {
    let data = (JSON.parse(rawData))["articles"];

    return (
        { data }
    )
}

function formatDate(rawDate) {
    let dataMillisec = Date.parse(rawDate);
    let dataFormattata = new Date(dataMillisec).toUTCString();

    return (
        dataFormattata
    )
}

export default AnimalNews;
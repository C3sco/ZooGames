import Game from './Game.js'
import Loading from './Loading.js'
import Error from './Error.js'
import { useState, useEffect } from 'react'


function QuizPage() {

    // const [isLoading, setLoading]
    const [quiz, setQuiz] = useState({ isLoading: true, error: "", data: null });
    const { isLoading, error, data } = quiz;


    useEffect(() => {

        async function getQuiz() {

            try {
                console.log("Sto caricando le domande");
                const url = "https://opentdb.com/api.php?amount=10&category=27";
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Errore nella richiesta url")
                }
                const json = await response.json();
                const { response_code, results } = json

                if (response_code === 1) {
                    throw new Error("Errore nella richiesta api, nessun risultato")
                }

                setQuiz({
                    isLoading: false,
                    error: "",
                    data: results
                })

                console.log(json)
            } catch (err) {
                setQuiz({
                    isLoading: false,
                    error: "Qualcosa è andato storto",
                    data: null
                })
            }
        }
        getQuiz();

    }, []);

    let contents;
    if (isLoading) {
        contents = <Loading />
    } else if (error !== "") {
        contents = <Error>Qualcosa non ha funzionato</Error>
    } else {
        contents = <Game quizData={data} />
    }


    return (
        <main>
            {contents}
        </main>
    )

}
export default QuizPage
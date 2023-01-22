import { supabase } from "./Database.js";

export async function updateScore(userId, score) {
    if (userId != null) {
        try {
            let finalScore = 0
            const userScore = await supabase.from('users').select('score').eq('id', userId);
            console.log("userscore: " + userScore)
            finalScore = parseInt(score + userScore);
            console.log("Punteggio attuale: " + finalScore);
            await supabase.from('users').update({ score: finalScore }).eq('id', userId);
            return finalScore;
        } catch (err) {
            console.log("Errore nell'aggiornamento del punteggio: " + err);
        }
    }
}
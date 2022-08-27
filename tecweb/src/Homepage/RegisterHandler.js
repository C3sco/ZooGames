export class ReigsterHandler {
    user = (u) => {
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(u)
        }

        return fetch('http://localhost:3000/utenti', request).then(response => response)
    }

}
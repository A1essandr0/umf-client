import { server_url } from "./config";


export function createLinkServerRequest(url: string, alias: string) {
    let requestBody = { url: url }
    if (alias) requestBody["alias"] = alias;

    return fetch(`${server_url}/create`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    }).then(response => { 
        if (response.status == 200) return response.json()
        else throw `something went wrong on the server side, ${response.statusText}`
    }).catch(err => console.log(err))
}

export function getRecords() {
    return fetch(`${server_url}/records`, {
        method: 'GET',
    }).then(response => { return response.json()}
    ).catch(err => console.log(err))
}
import axios from 'axios';

export async function registerEvent(event){
    const body = event;
    const headers = {
        'Content-Type': 'application/json',
    };
    return axios.post('https://sosmanaus-default-rtdb.firebaseio.com/events.json', body, { headers })
        .then(({ data }) => {
        return data;
        })
        .catch(error => {
        return null;
    });
    return data;
};

export async function listEvents(){
    const headers = {
        'Content-Type': 'application/json',
    };
    return axios.get('https://sosmanaus-default-rtdb.firebaseio.com/events.json', { headers })
        .then(({ data }) => {
        return data;
        })
        .catch(error => {
        return error;
    });
    return data;
};
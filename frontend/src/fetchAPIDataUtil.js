import axios from 'axios';

const URL_PARAM = `url`;
const EX_SEC_PARAM = `ex_sec`;

const REMOTE_API_SERVICE_URL = `${process.env.REACT_APP_BACKEND_URL}api/remoteAPI/`;

export async function fetchAPIData(componentKey, hostURL, exSec, method = 'get') {
    if (isDataExist(componentKey) && !isDataExpired(componentKey)) {
        return JSON.parse(localStorage.getItem(componentKey)).data;
    } else {
        let data;
        await axios({
            method: method,
            url: getRemoteDataURL(hostURL, exSec)
        })
            .then((response) => {
                data = response.data;
                storeLocalData(componentKey, data, exSec);
            })
            .catch(() => {
                data = (isDataExist(componentKey))
                    ? JSON.parse(localStorage.getItem(componentKey)).data
                    : null;
            });
        return data;
    }
}

// export async function fetchArrayAPIDataPromiseAll(componentKey, arrayURL, exSec, method = 'get') {
//     if (isDataExist(componentKey) && !isDataExist(componentKey)) {
//         return JSON.parse(localStorage.getItem(componentKey)).data;
//     } else {
//         let data = [];
//         let promises = [];
//         arrayURL.forEach(url => {
//             let promise = axios({
//                 method: method,
//                 url: getRemoteDataURL(url, exSec)
//             });
//             promises.push(promise);
//         });
//         await axios.all(promises)
//             .then(axios.spread((...promises) => {
//                 data = [...promises];
//             }));
//         return data;
//     }
// }

export function getRemoteDataURL(url, exSec) {
    return `${REMOTE_API_SERVICE_URL}?${URL_PARAM}=${encodeURIComponent(url)}&${EX_SEC_PARAM}=${exSec}`;
}

export function isDataExist(componentKey) {
    return localStorage.getItem(componentKey) !== null;
}


export function isDataExpired(componentKey) {
    return new Date(JSON.parse(localStorage.getItem(componentKey)).exTime) < new Date();
}

export function storeLocalData(componentKey, data, exSec) {
    localStorage.setItem(componentKey,
        JSON.stringify({ data: data, exTime: new Date(new Date().getTime() + exSec * 1000) }));
}
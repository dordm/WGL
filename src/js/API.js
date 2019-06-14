import mockData from './mockData';

const baseUrl = "https://212.143.103.159:5001/api/";

window.AppApi = {
    async getData(countryCode, id){
        const url = baseUrl + `BusinessData/${countryCode}/511535239`;
        // const url = baseUrl + `BusinessData/${countryCode}/${id}`;
        console.log(url)
        const json = await fetch(url, {
            requestCert: false,
            rejectUnauthorized: false,
            agent:false
        })
            .then(response => response.json())
            .catch(err => {
                console.log(err)
                return null;
            });
        return json;
    }
};

window.AppApiMock = {
    async getData(){
        return mockData;
    }
};
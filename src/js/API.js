import mockData from "./mockData";
import axios from "axios";

const baseUrl = "https://212.143.103.159:5001/api/";

window.AppApi = {
  async getData(countryCode, id) {
    const api = window.AppApi;
    const data = {
      businessData: await api.getBusinessData(countryCode, id),
      suppliers: [],
      listSuppliers: [],
      sentInvoices: [],
      receivedInvoices: [],
      clients: await api.getCustomersData(countryCode, id)
    };

    return data;
  },

  async getBusinessData(countryCode, id) {
    const url = baseUrl + `BusinessData/${countryCode}/511535239`;
    // const url = baseUrl + `BusinessData/${countryCode}/${id}`;
    const json = await axios
      .get(url)
      .then(response => response.data)
      .catch(err => {
        return null;
      });
    return json;
  },

  async getCustomersData(countryCode, id) {
    const url = baseUrl + `CustomerData/${countryCode}/511535239`;
    // const url = baseUrl + `BusinessData/${countryCode}/${id}`;
    const json = await axios
      .get(url)
      .then(response => response.data)
      .catch(err => {
        return null;
      });
    return json;
  },

  async postBusinessData(data) {
    const url = baseUrl + `BusinessData`;
    const json = await axios
      .post(url, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => response.data)
      .catch(err => {
        return null;
      });
    return json;
  },

  async postCustomerData(data) {
    const url = baseUrl + `CustomerData`;
    const json = await axios
      .post(url, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => response.data)
      .catch(err => {
        return null;
      });
    console.log(json)
    return json;
  },

    async putCustomerData(data) {
        const url = baseUrl + `CustomerData`;
        const json = await axios
            .put(url, JSON.stringify(data), {
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.data)
            .catch(err => {
                return null;
            });
        console.log(json)
        return json;
    }
};

window.AppApiMock = {
  async getData() {
    return mockData;
  }
};

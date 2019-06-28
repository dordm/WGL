import mockData from "./mockData";
import axios from "axios";

const baseUrl = "https://212.143.103.159:5001/api/";

window.AppApi = {
  async getData(countryCode, id) {
    const api = window.AppApi;
    return {
      businessData: await api.getBusinessData(countryCode, id),
      suppliers: await api.getVendorList(countryCode, id),
      sentInvoices: await api.getLastSentInvoicesList(countryCode, id),
      receivedInvoices: await api.getLastInvoicesList(countryCode, id),
      clients: await api.getCustomersData(countryCode, id)
    };
  },

  async getBusinessData(countryCode, id) {
    // const url = baseUrl + `BusinessData/${countryCode}/511535239`;
    const url = baseUrl + `BusinessData/${countryCode}/${id}`;
    return await axios
      .get(url)
      .then(response => response.data)
      .catch(err => {
        return null;
      });
  },

  async getCustomersData(countryCode, id) {
    const url = baseUrl + `CustomerData/list/${countryCode}/${id}`;
    return await axios
      .get(url)
      .then(response => response.data)
      .catch(err => {
        return null;
      });
  },

  async postBusinessData(data) {
    const url = baseUrl + `BusinessData`;
    return await axios
      .post(url, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => response.data)
      .catch(err => {
        return null;
      });
  },

  async getVendorList(countryCode, id) {
    const url = baseUrl + `vendordata/list/${countryCode}/${id}`;
    return await axios
      .get(url)
      .then(response => response.data)
      .catch(err => {
        return null;
      });
  },

  async getVendorInvoices(countryCode, id, vendorNumber) {
    const url =
      baseUrl + `vendordata/invoice/${countryCode}/${id}/${vendorNumber}`;
    return await axios
      .get(url)
      .then(response => response.data)
      .catch(err => {
        return null;
      });
  },

  async getLastInvoicesList(countryCode, id) {
    const url =
      baseUrl + `vendordata/GetTopVendorsinvoices/${countryCode}/${id}/10`;
    return await axios
      .get(url)
      .then(response => response.data)
      .catch(err => {
        return null;
      });
  },

  async getLastSentInvoicesList(countryCode, id) {
    const url =
      baseUrl + `customerinvoices/TopCustomersInvoices/${countryCode}/${id}/10`;
    return await axios
      .get(url)
      .then(response => response.data)
      .catch(err => {
        return null;
      });
  },

  async getCustomerInvoicesList(countryCode, id, custNumber) {
    const url =
      baseUrl + `customerinvoices/${countryCode}/${id}/${custNumber}`;
    return await axios
      .get(url)
      .then(response => response.data)
      .catch(err => {
        return null;
      });
  }
};

window.AppApiMock = {
  async getData() {
    return mockData;
  }
};

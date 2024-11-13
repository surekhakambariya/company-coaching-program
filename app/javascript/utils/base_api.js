import makeReq from './api'; // Import the makeReq function

export default class BaseAPI {
  _baseUrl = '/admin/'; // Default base URL
  _url;

  constructor(urlPath, baseURL = null) {
    this._url = `${baseURL || this._baseUrl}${urlPath}`; // Construct the full URL
  }

  async all(queryParams = {}) {
    return await makeReq({
      url: this._url,
      queryParams: queryParams // Pass query parameters for GET requests
    });
  }

  async find(id, queryParams = {}) {
    return await makeReq({
      url: `${this._url}/${id}`, // Construct URL for finding a specific resource
      queryParams: queryParams
    });
  }

  async create(data) {
    return await makeReq({
      url: this._url, // Use the base URL for creating a new resource
      method: 'POST', // Specify the HTTP method
      body: data // Pass the data to be sent in the request body
    });
  }

  async update(id, data) {
    return await makeReq({
      url: `${this._url}/${id}`, // Construct URL for updating a specific resource
      method: 'PATCH', // Specify the HTTP method
      body: data // Pass the data to be sent in the request body
    });
  }

  async delete(id) {
    return await makeReq({
      url: `${this._url}/${id}`, // Construct URL for deleting a specific resource
      method: 'DELETE' // Specify the HTTP method
    });
  }
}
import BaseAPI from '../../base_api'; // Adjust the import path as necessary

class CompanyAPI extends BaseAPI {
  constructor() {
    super('companies'); // Initialize with the endpoint for companies
  }

  async getAllCompanies(queryParams = {}) {
    return await this.all(queryParams); // Use the inherited all method to fetch companies
  }
}

export const companyAPI = new CompanyAPI(); // Export an instance of CompanyAPI
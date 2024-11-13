import BaseAPI from '../../base_api'; // Adjust the import path as necessary

class CompanyProgramAPI extends BaseAPI {
  constructor() {
    super('company_programs'); // Initialize with the endpoint for coaching programs
  }
}

export const companyProgramAPI = new CompanyProgramAPI(); // Export an instance of CoachProgramAPI
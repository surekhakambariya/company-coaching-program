import BaseAPI from '../../base_api'; // Adjust the import path as necessary

class CoachingProgramAPI extends BaseAPI {
  constructor() {
    super('coaching_programs'); // Initialize with the endpoint for coaching programs
  }
}

export const coachingProgramAPI = new CoachingProgramAPI(); // Export an instance of CoachProgramAPI
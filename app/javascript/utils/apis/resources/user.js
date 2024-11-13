import BaseAPI from '../../base_api'; // Adjust the import path as necessary
import makeReq from '../../api' // Import the makeReq function

class UserAPI extends BaseAPI {
  constructor() {
    super('users'); // Initialize with the endpoint for users
  }

  async getCurrentUser() {
    const url = `users/current_user`;
    return await makeReq({
      url: url,
      method: "get"
    })
  }

  async signOut() {
    const url = `/users/sign_out`;
    return await makeReq({
      url: url,
      method: "delete"
    }).then(() => {
      localStorage.removeItem("user");
      window.location.href = "/users/sign_in";
    })
  }

  async getCurrentUserCoachPrograms() {
    const url = `users/coach_programs`;
    return await makeReq({
      url: url,
      method: "get"
    })
  }

  async getCurrentUserCoachingPrograms() {
    const url = `users/coaching_programs`;
    return await makeReq({
      url: url,
      method: "get"
    })
  }


  async joinCompanyProgram(companyProgramId) {
    const url = `users/join_company_program`;
    return await makeReq({
      url: url,
      method: "post",
      body: {
        company_program_id: companyProgramId
      }
    })
  }

  async leaveCompanyProgram(enrollmentId) {
    const url = `users/leave_company_program`;
    return await makeReq({
      url: url,
      method: "post",
      body: {
        id: enrollmentId
      }
    })
  }
}

export const userAPI = new UserAPI(); // Export an instance of UserAPI
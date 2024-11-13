import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import CompanyList from "../components/Company/CompanyList";
import NewCompany from "../components/Company/New";
import CompanyShow from "../components/Company/Show";
import UserList from "../components/User/List";
import NewUser from "../components/User/New";
import UserShow from "../components/User/Show";
import CoachingProgramList from "../components/CoachingPrograms/CoachingProgramList";
import NewCoachingProgram from "../components/CoachingPrograms/New";
import CoachingShow from "../components/CoachingPrograms/Show";
import CoachesList from "../components/Coach/CoachesList";
import CoachNew from "../components/Coach/New";
import CoachShow from "../components/Coach/Show";
import NewEmployee from "../components/Employee/New";
import EditCompany from "../components/Company/Edit";
import EditCoachingProgram from "../components/CoachingPrograms/Edit";
// import NotFound from "../components/NotFound";

export default (
  <div className="App">
    <header className="container">
      <div className="content-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/new" element={<NewCompany />} />
          <Route path="/companies/:id" element={<CompanyShow />} />
          <Route path="/companies/:id/edit" element={<EditCompany />} />
          <Route path="/companies/:id/employees/new" element={<NewEmployee />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/new" element={<NewUser />} />
          <Route path="/users/:id" element={<UserShow />} />
          <Route path="/coaching_programs" element={<CoachingProgramList />} />
          <Route path="/coaching_programs/new" element={<NewCoachingProgram />} />
          <Route path="/coaching_programs/:id" element={<CoachingShow />} />
          <Route path="/coaching_programs/:id/edit" element={<EditCoachingProgram />} />
          <Route path="/coaches" element={<CoachesList />} />
          <Route path="/coaches/new" element={<CoachNew />} />
          <Route path="/coaches/:id" element={<CoachShow />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </header>
  </div>
);
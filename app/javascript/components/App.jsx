import React from "react";
import Routes from "../routes";
import Sidebar from "./Sidebar";

export default props => <>
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
          {Routes}
      </div>
    </div>
</>;
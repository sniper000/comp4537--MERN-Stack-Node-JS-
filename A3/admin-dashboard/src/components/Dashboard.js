import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Report from "./Report";

function Dashboard() {
  return (
    <>
      <p>Admin Dashboard Table</p>
      <nav>
        <ul>
          <li>
            <Link to="/report/1">
              Report 1 - Unique API users over a period of time
            </Link>
          </li>
          <li>
            <Link to="/report/2">
              Report 2 - Top API users over period of time
            </Link>
          </li>
          <li>
            <Link to="/report/3">Report 3 - Top users for each Endpoint</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/report/1" element={<Report id={1} />} />
        <Route path="/report/2" element={<Report id={2} />} />
        <Route path="/report/3" element={<Report id={3} />} />
      </Routes>
    </>
  );
}

export default Dashboard;

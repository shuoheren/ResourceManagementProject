// Dashboard.js
// Dashboard.js
import React from "react";
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      {/* <Sidebar /> */}
      <main>
        <h1>Main Content</h1>
        <p>This is where the dynamic main content goes.</p>
      </main>
    </div>
  );
};

export default Dashboard;

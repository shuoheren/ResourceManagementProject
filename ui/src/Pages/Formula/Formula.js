import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Formula.css";

function Formula() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetching data from API
    axios
      .get("http://localhost:8085/formulas")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching formula data:", error);
      });
  }, []);

  const handleSubmit = () => {
    // Here you can handle the submission to the API
    // You might want to POST the data to an API or handle it accordingly.
    axios
      .post("http://localhost:8085/formulas", data)
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <div className="formula-page">
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>COST_CODE</th>
            <th>EDITABLE</th>
            <th>ITEM_ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.formulaName}</td>
              <td>{item.formulaCostCode}</td>
              <td>{item.edited ? "Yes" : "No"}</td>
              <td>{item.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Formula;

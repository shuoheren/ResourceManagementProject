import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";
import "./Formula.css";
import { BASE_URL } from "../../config/urls";

function Formula() {
  const { username: currentUsername } = useContext(AppContext);
  const [data, setData] = useState([]);

  const [newFormula, setNewFormula] = useState({
    formulaName: "",
    formulaCostCode: "",
    edited: false,
    id: "",
  });

  const [editingFormula, setEditingFormula] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${BASE_URL}/formulas`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching formula data:", error);
      });
  };

  const handleAddFormula = () => {
    axios
      .post(`${BASE_URL}/formulas`, newFormula)
      .then((response) => {
        fetchData();
        setNewFormula({
          formulaName: "",
          formulaCostCode: "",
          edited: false,
          id: "",
        });
      })
      .catch((error) => {
        console.error("Error adding new formula:", error);
      });
  };

  const handleEditFormula = () => {
    if (editingFormula) {
      axios
        .put(`${BASE_URL}/formulas/${editingFormula.id}`, editingFormula)
        .then(() => {
          fetchData();
          setEditingFormula(null);
        })
        .catch((error) => {
          console.error("Error editing formula:", error);
        });
    }
  };

  const handleRowClick = (formula) => {
    setEditingFormula({ ...formula });
  };

  return (
    <div className="formula-page">
      {/* Add Formula Section */}
      <div className="add-formula-section">
        <h3>Add Formula</h3>
        <input
          placeholder="Formula Name"
          value={newFormula.formulaName}
          onChange={(e) =>
            setNewFormula({ ...newFormula, formulaName: e.target.value })
          }
        />
        <input
          placeholder="Cost Code"
          value={newFormula.formulaCostCode}
          onChange={(e) =>
            setNewFormula({ ...newFormula, formulaCostCode: e.target.value })
          }
        />
        <button onClick={handleAddFormula}>Add Formula</button>
      </div>

      {/* Edit Formula Section */}
      {editingFormula && (
        <div className="edit-formula-section">
          <h3>Edit Formula</h3>
          <input
            placeholder="Formula Name"
            value={editingFormula.formulaName}
            onChange={(e) =>
              setEditingFormula({
                ...editingFormula,
                formulaName: e.target.value,
              })
            }
          />
          <input
            placeholder="Cost Code"
            value={editingFormula.formulaCostCode}
            onChange={(e) =>
              setEditingFormula({
                ...editingFormula,
                formulaCostCode: e.target.value,
              })
            }
          />
          <button onClick={handleEditFormula}>Confirm Edit</button>
          <button onClick={() => setEditingFormula(null)}>Cancel</button>
        </div>
      )}

      {/* Formula Table */}
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
            <tr key={item.id} onClick={() => handleRowClick(item)}>
              <td>{item.formulaName}</td>
              <td>{item.formulaCostCode}</td>
              <td>{item.edited ? "Yes" : "No"}</td>
              <td>{item.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Formula;

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import AddSchool from "./Components/AddSchool";
import ShowSchools from "./Components/ShowSchools";
import axios from "axios";

function App() {
  const [schools, setSchools] = useState([]);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch schools on app load
  useEffect(() => {
    axios.get(`${API_URL}/schools`)
      .then((res) => setSchools(res.data))
      .catch((err) => console.error("Error fetching schools:", err));
  }, []);

  return (
    <Router>
      <nav className="bg-blue-600 text-white p-4 flex justify-between">
        <NavLink to="/" className="font-bold">SchoolApp</NavLink>
        <div className="space-x-4">
          <NavLink to="/" className="hover:underline">Add School</NavLink>
          <NavLink to="/schools" className="hover:underline">Show Schools</NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<AddSchool setSchools={setSchools} />} />
      <Route path="/schools" element={<ShowSchools schools={schools} />} />
      </Routes>
    </Router>
  );
}

export default App;

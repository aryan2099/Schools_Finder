import { useEffect, useState } from "react";
import axios from "axios";

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios.get(`${API_URL}/schools`)
      .then((res) => setSchools(res.data))
      .catch((err) => console.error("Error fetching schools:", err));
  }, []);

  const ShowSchools = ({ schools }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-2xl transition-shadow duration-300">
      {schools.map((school) => (
        <div key={school.id} className="bg-white shadow-lg rounded-2xl p-4">
          <img
            src={`${API_URL}/schoolImages/${school.image}`}
            alt={school.name}
            className="h-40 w-full object-cover rounded-lg mb-3"
          />
          <h3 className="text-lg font-bold">{school.name}</h3>
          <p>{school.address}, {school.city}</p>
          <p className="text-gray-600">{school.state}</p>
        </div>
      ))}
    </div>
  );
};
}
export default ShowSchools;

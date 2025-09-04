import { useForm } from "react-hook-form";
import axios from "axios";

const AddSchool = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  console.log("API_URL from env:", import.meta.env.VITE_BACKEND_URL);
  const { register, handleSubmit, formState: { errors } } = useForm();
const onSubmit = async (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (key === "image") {
      formData.append(key, data.image[0]); // use the first file
    } else {
      formData.append(key, data[key]);
    }
  });

  try {
    await axios.post(`${API_URL}/addSchool`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("School added successfully!");
  } catch (error) {
    console.error("Error adding school:", error);
    alert("Failed to add school");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add School</h2>

        <input {...register("name", { required: true })} placeholder="School Name"
          className="w-full p-2 border rounded mb-3" />
        {errors.name && <p className="text-red-500">Name is required</p>}

        <input {...register("address", { required: true })} placeholder="Address"
          className="w-full p-2 border rounded mb-3" />

        <input {...register("city", { required: true })} placeholder="City"
          className="w-full p-2 border rounded mb-3" />

        <input {...register("state", { required: true })} placeholder="State"
          className="w-full p-2 border rounded mb-3" />

        <input {...register("contact", { required: true })} type="number" placeholder="Contact Number"
          className="w-full p-2 border rounded mb-3" />

        <input {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })}
          placeholder="Email" className="w-full p-2 border rounded mb-3" />

        <input {...register("image", { required: true })} type="file"
          className="w-full p-2 border rounded mb-3" />

        <button type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddSchool;



import React, { useState } from "react";

const AdminAddPlan = ({ onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    price: "",
  
    buttonText: "Subscribe",
  });

  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("http://localhost:5000/admin/plans", {
        method: "POST",
        body: formData,
        credentials: "include", 
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(` Plan "${data.title}" created!`);

        setForm({
          title: "",
          price: "",
      
          buttonText: "Subscribe",
        });
        setImageFile(null);

        if (onSuccess) onSuccess(); 
      } else {
        setMessage(data.message || " Failed to create plan");
      }
    } catch (err) {
      console.error(err);
      setMessage(" Server error");
    }
  };

  return (
    <div className="mb-8 p-4 border border-gray-600 rounded">
      <h2 className="text-xl font-bold mb-4">Add New Plan</h2>


      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="p-2 rounded bg-gray-800"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="p-2 rounded bg-gray-800"
        />

      


        <input
          type="text"
          name="buttonText"
          placeholder="Button Text"
          value={form.buttonText}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="p-2 rounded bg-gray-800"
        />

        <button
          type="submit"
          className="bg-green-600 p-2 rounded font-bold mt-2"
        >
          Create Plan
        </button>
      </form>
    </div>
  );
};

export default AdminAddPlan;
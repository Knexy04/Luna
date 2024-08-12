import Subcategory from "./Subcategory";
import module from "./categoryPage.module.css";

import axios from "../../../axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategoryPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    engName: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/category", {
        ...formData,
        subcategory: false,
      });
      navigate(`/categories`);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="bg-back flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full sm:max-w-md">
        <h1 className="text-2xl font-bold text-main mb-6">
          Добавить категорию
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold">
              Название:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Название"
              value={formData.name}
              onChange={handleChange}
              className="border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="engName" className="font-semibold">
              Английское название:
            </label>
            <input
              type="text"
              id="engName"
              name="engName"
              placeholder="Английское название"
              value={formData.engName}
              onChange={handleChange}
              className="border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-main text-white font-bold rounded shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-main"
            >
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryPage;

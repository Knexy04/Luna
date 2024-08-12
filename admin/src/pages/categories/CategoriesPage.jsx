import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import module from "./categoriesPage.module.scss";
import Title from "../../components/title/Title";
import { NavLink, useNavigate } from "react-router-dom";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-back min-h-screen flex flex-col items-center justify-center">
  <div className="bg-white rounded-lg shadow-md p-8 w-full sm:max-w-3xl">
    <h1 className="text-2xl font-bold text-main mb-6">Все категории</h1>
    <NavLink to="/add-category">
      <button className="bg-main text-white px-4 py-2 rounded shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-main">
        Добавить новую категорию
      </button>
    </NavLink>
    {categories.map((category) => (
      <NavLink to={`/category/${category._id}`} key={category._id}>
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 my-4 mt-4">
          <h2 className="text-xl font-semibold">
            {category.name} ({category.engName})
          </h2>
          <p className="text-gray-600">Скрыта: {category.disabled ? "Да" : "Нет"}</p>
          {category.subcategories && category.subcategories.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Подкатегории:</h3>
              <ul>
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory._id} className="text-gray-600 border shadow p-2 rounded-xl mb-2">
                    <p>Название: {subcategory.name}</p>
                    <p>Скрыта: {subcategory.disabled ? "Да" : "Нет"}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </NavLink>
    ))}
  </div>
</div>
  );
};

export default CategoriesPage;

import module from "./categoryPage.module.css";
import axios from "../../../axios";

import { useState } from "react";

const Subcategory = ({ subcategories, fetchCategory, id }) => {
  const [newSubcategory, setNewSubcategory] = useState([]);
  const [editSubcategory, setEditSubcategory] = useState({
    _id: "",
    name: "",
    engName: "",
    disabled: false,
  });

  const handleNewSubcategoryChange = (e) => {
    setNewSubcategory({
      ...newSubcategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSubcategory = async () => {
    try {
      await axios.post(`/category`, {
        name: newSubcategory.name,
        engName: newSubcategory.engName,
        category: id,
        subcategory: true,
      });
      await fetchCategory();

      setNewSubcategory({
        name: "",
        engName: "",
        disabled: false,
      });
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

  const handleEditSubcategory = (subcategory) => {
    setEditSubcategory({
      _id: subcategory._id,
      name: subcategory.name,
      engName: subcategory.engName,
      disabled: subcategory.disabled,
    });
  };

  const handleUpdateSubcategory = async () => {
    try {
      await axios.patch(`/category?_id=${editSubcategory._id}`, {
        name: editSubcategory.name,
        engName: editSubcategory.engName,
        sub: true,
      });
      fetchCategory();

      setEditSubcategory({});
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };

  const handleDeleteSubcategory = async (subcategoryId) => {
    try {
      await axios.delete(`/category?_id=${subcategoryId}&sub=true`);
      fetchCategory();
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  const handleEnableSubCategory = async (subcategoryId) => {
    try {
      await axios.patch(`/enable-category?_id=${subcategoryId}&sub=true`);
      fetchCategory();
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  return (
    <div className="bg-back flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full sm:max-w-3xl">
        <h1 className="text-2xl font-bold text-main mb-6">Подкатегории</h1>
        <div className="space-y-4">
          {subcategories?.map((subcategory) => (
            <div
              key={subcategory?._id}
              className="bg-gray-100 shadow-md rounded-lg p-4 border border-gray-200"
            >
              <div className="mb-2">
                <p className="font-semibold">Название:</p>
                <p>{subcategory?.name}</p>
              </div>
              <div className="mb-2">
                <p className="font-semibold">Скрыта:</p>
                <p>{subcategory?.disabled ? "Да" : "Нет"}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEditSubcategory(subcategory)}
                  className="px-4 py-2 bg-main text-white font-bold rounded shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-main"
                >
                  Изменить
                </button>

                <button
                  onClick={() => handleDeleteSubcategory(subcategory._id)}
                  className="px-4 py-2 bg-red-500 text-white font-bold rounded shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Скрыть
                </button>
                <button
                  onClick={() => handleEnableSubCategory(subcategory._id)}
                  className="px-4 py-2 bg-blue-500 text-white font-bold rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Раскрыть
                </button>
              </div>
              {editSubcategory._id === subcategory._id && (
                <div className="flex space-x-4 mt-4">
                  <input
                    type="text"
                    name="name"
                    value={editSubcategory.name}
                    onChange={(e) =>
                      setEditSubcategory({
                        ...editSubcategory,
                        name: e.target.value,
                      })
                    }
                    className="border-gray-300 rounded-md w-f shadow-sm focus:ring-main focus:border-main sm:text-sm"
                  />
                  <button
                    onClick={handleUpdateSubcategory}
                    className="px-4 py-2 bg-green-500 text-white font-bold rounded shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Сохранить
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 bg-gray-100 shadow-md rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-bold text-main mb-2">
            Добавить подкатегорию:
          </h3>
          <div className="flex space-x-4 items-center">
            <input
              type="text"
              name="name"
              placeholder="Название"
              value={newSubcategory.name}
              onChange={handleNewSubcategoryChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
            />
            <button
              type="button"
              onClick={handleAddSubcategory}
              className="px-4 py-2 bg-main text-white font-bold rounded shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-main"
            >
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subcategory;

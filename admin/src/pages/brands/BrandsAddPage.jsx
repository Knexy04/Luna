import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import styles from "./BrandEditPage.module.scss";

const BrandsAddPage = () => {
  const navigate = useNavigate();
  const [brandName, setBrandName] = useState("");

  const handleSave = () => {
    axios
      .post(`/brand`, { name: brandName })
      .then(() => {
        navigate("/brands");
      })
      .catch((error) => {
        console.error("Error creating brand:", error);
      });
  };

  return (
    <div className="bg-back flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full sm:max-w-lg">
        <h1 className="text-2xl font-bold text-main mb-6">Добавить бренд</h1>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="brandName"
              className="block text-sm font-medium text-gray-700"
            >
              Название
            </label>
            <input
              type="text"
              id="brandName"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
            />
          </div>
          <button
            onClick={handleSave}
            className="mt-4 w-full px-4 py-2 bg-main text-white font-bold rounded shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-main"
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandsAddPage;

import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import styles from "./BrandsPage.module.scss";
import { NavLink } from "react-router-dom";

const BrandsPage = () => {
  const [allBrands, setAllBrands] = useState([]);

  useEffect(() => {
    axios
      .get("/brands")
      .then((res) => {
        setAllBrands(res.data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });
  }, []);

  const handleDeleteClick = (brand) => {
    axios
      .delete(`/brand/${brand._id}`)
      .then((res) => {
        if (res.status === 200) {
          setAllBrands((prevState) =>
            prevState.filter((el) => el._id !== brand._id)
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting brand:", error);
      });
  };

  return (
    <div className="bg-back flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full sm:max-w-lg">
        <h1 className="text-2xl font-bold text-main mb-6">Бренды</h1>
        <NavLink
          to="/brands/new"
          className="block px-4 py-2 bg-main text-white font-semibold rounded shadow-md hover:bg-opacity-80 mb-4"
        >
          Добавить новый бренд
        </NavLink>
        <ul>
          {allBrands.map((brand) => (
            <li
              key={brand._id}
              className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4"
            >
              <span className="text-lg font-medium text-gray-800">
                {brand.name}
              </span>
              <div className="flex items-center space-x-4">
                <NavLink
                  to={`/brand/${brand._id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <span className="text-xl cursor-pointer">&#9998;</span>
                </NavLink>
                <span
                  className="text-red-500 cursor-pointer text-xl"
                  onClick={() => handleDeleteClick(brand)}
                >
                  &#10060;
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BrandsPage;

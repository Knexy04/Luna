import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import styles from "./CollectionsPage.module.scss"; // Импорт модульного SCSS
import { NavLink } from "react-router-dom";

const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get("/collections"); // Запрос на получение коллекций
        setCollections(response.data); // Установка полученных коллекций в состояние
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections(); // Вызов функции получения коллекций при загрузке компонента
  }, []);
  console.log(collections)
  return (
    <div className="bg-back flex flex-col items-center justify-center">
  <div className="bg-white rounded-lg shadow-md p-8 w-full sm:max-w-3xl">
    <h1 className="text-2xl font-bold text-main mb-6">Подборки</h1>
    <div className="mb-4">
      <NavLink to="/collections/add">
        <button className="px-4 py-2 bg-main text-white font-bold rounded shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-main">
          Добавить подборку
        </button>
      </NavLink>
    </div>
    <div className="space-y-4">
      {collections.map((collection) => (
        <NavLink key={collection._id} to={`/collection/${collection._id}`}>
          <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 mb-4 flex items-center justify-between">
            <div>
            <h2 className="text-lg font-bold mb-2">{collection.name}</h2>
            <p className="text-sm mb-2">Количество элементов: {collection.items.length}</p>
            <p className="text-sm mb-2">Скрыто: {collection.disabled ? "Да" : "Нет"}</p>
            </div>
            <div className="w-[120px]">
              <img height={150} src={`${import.meta.env.VITE_HOST}${collection.photo}`} />
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  </div>
</div>

  );
};

export default CollectionsPage;

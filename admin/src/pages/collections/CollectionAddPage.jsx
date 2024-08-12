import React, { useState } from "react";
import axios from "../../../axios";
// import styles from "./CollectionPage.module.scss";
import { useNavigate } from "react-router-dom";

const CollectionAddPage = () => {
  const [collection, setCollection] = useState({ name: "", disabled: false });
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCollection((prevCollection) => ({
      ...prevCollection,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCollection((prevCollection) => ({
      ...prevCollection,
      [name]: checked,
    }));
  };

  const handleFileChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      // Create FormData for photos
      const formDataPhotos = new FormData();
      photos.forEach((photo) => {
        formDataPhotos.append("images", photo);
      });

      // Upload photos
      const uploadResponse = await axios.post("/upload", formDataPhotos, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(uploadResponse.data);

      // Submit collection with uploaded photo URLs
      const collectionResponse = await axios.post("/collection", {
        ...collection,
        photos: uploadResponse.data,
      });
      console.log("Коллекция успешно добавлена:", collectionResponse.data);
      navigate('/collections');
    } catch (error) {
      console.error(
        "Ошибка добавления коллекции:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="bg-back flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full sm:max-w-md">
        <form onSubmit={handleAdd}>
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-main mb-6">Новая подборка</h1>
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="mr-2">
                Название подборки:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={collection.name}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
                placeholder="Введите название подборки"
              />
            </div>
            <div className="flex items-center justify-start mb-4">
              <input
                type="checkbox"
                id="disabled"
                name="disabled"
                checked={collection.disabled}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="disabled">Скрыта</label>
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="photos" className="mr-2">
                Загрузить фото:
              </label>
              <input
                type="file"
                id="photos"
                name="photos"
                multiple
                onChange={handleFileChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
              />
            </div>
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

export default CollectionAddPage;

import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import styles from "./CollectionPage.module.scss";
import { NavLink, useParams, useNavigate } from "react-router-dom";

const CollectionPage = () => {
  const [collection, setCollection] = useState({ name: "", disabled: false });
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Получение данных о коллекции
    const fetchCollection = async () => {
      try {
        const response = await axios.get("/collection", {
          params: { _id: id },
        });
        setCollection(response.data);
      } catch (error) {
        console.error("Error fetching collection:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollection();
  }, [id]);

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
    setPhoto(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let uploadedPhotos = [];
      
      // Upload photo if selected
      if (photo) {
        const formDataPhotos = new FormData();
        formDataPhotos.append("images", photo);

        const uploadResponse = await axios.post("/upload", formDataPhotos, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        uploadedPhotos = uploadResponse.data;
      }

      // Submit collection with uploaded photo URLs
      const updatedCollection = {
        ...collection,
        photo: uploadedPhotos.length ? uploadedPhotos[0] : collection.photos,
      };

      const response = await axios.patch(`/collection/${id}`, updatedCollection);
      console.log("Collection updated successfully:", response.data);
      navigate('/collections');
    } catch (error) {
      console.error("Error updating collection:", error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="bg-back flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full sm:max-w-md">
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-main mb-6">Редактировать подборку</h1>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Название подборки
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={collection.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
                placeholder="Введите название подборки"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="disabled" className="flex items-center">
                <input
                  type="checkbox"
                  id="disabled"
                  name="disabled"
                  checked={collection.disabled}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Скрыта</span>
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                Загрузить новое фото
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={handleFileChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-main text-white font-bold rounded shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-main disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollectionPage;

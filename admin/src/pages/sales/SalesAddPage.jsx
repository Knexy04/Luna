import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../axios";
import styles from "./SaleEditPage.module.scss";

const SalesAddPage = () => {
  const navigate = useNavigate();
  const [sale, setSale] = useState({
    name: "",
    subtitle: "",
    start: null,
    end: null,
    photo: null,
    disabled: false, // Начальное значение для чекбокса disabled
  });
  const [error, setError] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      setSale((prevSale) => ({
        ...prevSale,
        [name]: checked,
      }));
    } else if (name === "photo" && files.length > 0) {
      const file = files[0];
      setPhotoFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setSale((prevSale) => ({
          ...prevSale,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setSale((prevSale) => ({
        ...prevSale,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let photoUrl = sale.photo;

      if (photoFile) {
        const formData = new FormData();
        formData.append("images", photoFile);

        const response = await axios.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        photoUrl = response.data[0];
      }
      console.log(photoUrl);

      const updatedSale = {
        ...sale,
        photo: photoUrl,
      };

      const response = await axios.post(`/sale`, updatedSale);

      if (response.status === 200) {
        navigate("/sales");
      }
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  }

  return (
    <div className="bg-back flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold">
              Название
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={sale.name}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subtitle" className="block font-semibold">
              Подзаголовок
            </label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={sale.subtitle}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="start" className="block font-semibold">
              Дата начала
            </label>
            <input
              type="date"
              id="start"
              name="start"
              value={
                sale.start
                  ? new Date(sale.start).toISOString().substr(0, 10)
                  : ""
              }
              onChange={handleChange}
              className="w-full border shadow p-2 rounded-md focus:ring-main focus:border-main sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="end" className="block font-semibold">
              Дата конца
            </label>
            <input
              type="date"
              id="end"
              name="end"
              value={
                sale.end ? new Date(sale.end).toISOString().substr(0, 10) : ""
              }
              onChange={handleChange}
              className="w-full border shadow p-2 rounded-md focus:ring-main focus:border-main sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="photo" className="block font-semibold">
              Фото
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
            />
            {sale.photo && (
              <div className="mt-2">
                <img
                  src={sale.photo}
                  alt="Preview"
                  className="w-full h-auto rounded-md"
                />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="disabled"
                checked={sale.disabled}
                onChange={handleChange}
                className="form-checkbox text-main focus:ring-main"
              />
              <span className="ml-2">Скрыта</span>
            </label>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-main text-white font-bold rounded shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-main"
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default SalesAddPage;

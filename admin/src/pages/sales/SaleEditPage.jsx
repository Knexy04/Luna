// SaleEditPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../axios";
import styles from "./SaleEditPage.module.scss";

const SaleEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const response = await axios.get("/sale", { params: { _id: id } });
        setSale(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSale();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      setSale((prevSale) => ({
        ...prevSale,
        [name]: checked, // Update based on checked status
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

      const response = await axios.patch(`/update-sale/${id}`, updatedSale);

      if (response.status === 200) {
        navigate("/sales");
      }
    } catch (error) {
      setError(error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  }

  return (
    <div className="bg-back flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Название
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={sale.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="subtitle"
              className="block text-sm font-medium text-gray-700"
            >
              Подзаголовок
            </label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={sale.subtitle}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="start"
              className="block text-sm font-medium text-gray-700"
            >
              Дата начала
            </label>
            <input
              type="date"
              id="start"
              name="start"
              value={new Date(sale.start).toISOString().substr(0, 10)}
              onChange={handleChange}
              className="mt-1 block w-full border shadow p-2 rounded-md focus:ring-main focus:border-main sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="end"
              className="block text-sm font-medium text-gray-700"
            >
              Дата конца
            </label>
            <input
              type="date"
              id="end"
              name="end"
              value={new Date(sale.end).toISOString().substr(0, 10)}
              onChange={handleChange}
              className="mt-1 block w-full border shadow p-2 rounded-md focus:ring-main focus:border-main sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700"
            >
              Фото
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
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
            <div className="flex items-center">
              <input
                id="disabled"
                name="disabled"
                type="checkbox"
                checked={sale.disabled}
                onChange={handleChange}
                className="h-4 w-4 text-main focus:ring-main border-gray-300 rounded"
              />
              <label
                htmlFor="disabled"
                className="ml-2 block text-sm text-gray-900"
              >
                Скрыта
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-main hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main"
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default SaleEditPage;

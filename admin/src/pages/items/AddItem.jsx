import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import module from "./items.module.scss";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    tags: null,
    photos: "",
    price: "",
    stock: null,
    sold: null,
    brand: "",
  });

  const navigate = useNavigate()

  const [categories, setCategories] = useState([]); // Состояние для хранения категорий

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/subcategories"); // Замените на актуальный путь к API
        setCategories(response.data);
      } catch (error) {
        console.error("Ошибка получения категорий:", error);
      }
    };
    fetchCategories();
  }, []);

  const [brands, setBrands] = useState([]); // Состояние для хранения брендов

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("/all-brands"); // Замените на актуальный путь к API
        setBrands(response.data);
      } catch (error) {
        console.error("Ошибка получения брендов:", error);
      }
    };
    fetchBrands();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const formDataPhotos = new FormData();

      // Append each file individually
      formData.photos.forEach((photo) => {
        formDataPhotos.append("images", photo);
      });

      const uploadResponse = await axios.post("/upload", formDataPhotos, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(uploadResponse.data);

      const itemResponse = await axios.post("/item", {
        ...formData,
        photos: uploadResponse.data,
      });
      console.log("Товар успешно добавлен:", itemResponse.data);
      navigate('/items')
    } catch (error) {
      console.error(
        "Ошибка добавления товара:",
        error.response ? error.response.data : error.message
      );
    }
};


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Преобразование FileList в массив
    const photosArray = files; // Создание URL для каждого файла

    // Обновление состояния с новыми URL-адресами файлов
    setFormData((prevState) => ({
      ...prevState,
      photos: photosArray,
    }));
  };
  return (
    <div className="bg-back min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full sm:max-w-lg">
        <h2 className="text-2xl font-bold text-main mb-6">Добавление нового товара</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Название */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Название:
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
              required
            />
          </div>
          {/* Описание */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Описание:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
              required
            />
          </div>
          {/* Категория */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Категория:
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border p-2 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
              required
            >
              <option value="">Выберите категорию</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {/* Фото URL */}
          <div>
            <label htmlFor="photos" className="block text-sm font-medium text-gray-700">
              Фото URL:
            </label>
            <input
              type="file"
              name="photos"
              onChange={(e) => handleFileChange(e)}
              multiple
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
            />
          </div>
          {/* Цена */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Цена:
            </label>
            <input
              id="price"
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
            />
          </div>
          {/* На складе */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              На складе:
            </label>
            <input
              id="stock"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
            />
          </div>
          {/* Продано */}
          <div>
            <label htmlFor="sold" className="block text-sm font-medium text-gray-700">
              Продано:
            </label>
            <input
              id="sold"
              type="number"
              name="sold"
              value={formData.sold}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
            />
          </div>
          {/* Бренд */}
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
              Бренд:
            </label>
            <select
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="mt-1 block w-full border p-2 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
              required
            >
              <option value="">Выберите бренд</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          {/* Кнопка добавления товара */}
          <button
            type="submit"
            className="mt-4 w-full px-4 py-2 bg-main text-white font-bold rounded shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-main"
          >
            Добавить товар
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;

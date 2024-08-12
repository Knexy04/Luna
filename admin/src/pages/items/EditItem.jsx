import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import module from "./items.module.scss";
import { useNavigate, useParams } from "react-router-dom";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const [item, setItem] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    tags: [],
    photos: [],
    price: [],
    sale: false,
    capacity: "",
    stock: 0,
    disabled: false,
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [newPhoto, setNewPhoto] = useState(null);

  const [allCollections, setAllCollections] = useState([]);
  const [allSales, setAllSales] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [selectedSales, setSelectedSales] = useState([]);
  const [categoryFaces, setCategoryFaces] = useState([])
  const [selectedFacesCategory, setSelectFacesCategory] = useState([])

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`/item`, { params: { _id: id } });
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    const fetchItemFacesCollection = async () => {
      try {
        const response = await axios.get(`/facescategoryitem?id=${id}`);
        setSelectFacesCategory(response.data);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("/subcategories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await axios.get("/all-brands");
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchCollections = async () => {
      try {
        const response = await axios.get("/collections");
        const collections = response.data;

        setAllCollections(collections);

        const selectedIds = collections
          .filter((col) => col.items.some((el) => el._id === id))
          .map((col) => col._id);

        setSelectedCollections(selectedIds);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    const fetchSales = async () => {
      try {
        const response = await axios.get("/sales");
        const sales = response.data;

        setAllSales(sales);

        const selectedIds = sales
          .filter((sale) => sale.items.some((el) => el._id === id))
          .map((sale) => sale._id);

        setSelectedSales(selectedIds);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    fetchItem();
    fetchCategories();
    fetchBrands();
    fetchCollections();
    fetchSales();
    fetchItemFacesCollection();
  }, [id]);

  useEffect(() => {
    axios.get("/facescategory")
      .then((res) => {
        setCategoryFaces(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagChange = (index, value) => {
    const newTags = [...item.tags];
    newTags[index] = value;
    setItem((prevItem) => ({
      ...prevItem,
      tags: newTags,
    }));
  };

  const handlePriceChange = (index, value) => {
    const newPrices = [...item.price];
    newPrices[index] = value;
    setItem((prevItem) => ({
      ...prevItem,
      price: newPrices,
    }));
  };

  const handlePhotoChange = (index, value) => {
    const newPhotos = [...item.photos];
    newPhotos[index] = value;
    setItem((prevItem) => ({
      ...prevItem,
      photos: newPhotos,
    }));
  };

  const handleNewPhotoChange = (e) => {
    setNewPhoto(e.target.files[0]);
  };

  const handleAddPhoto = async () => {
    if (newPhoto) {
      const formData = new FormData();
      formData.append("images", newPhoto);

      try {
        const response = await axios.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setItem((prevItem) => ({
          ...prevItem,
          photos: [...prevItem.photos, response.data[0]],
        }));
        setNewPhoto(null);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }
  };

  const handleRemovePhoto = (index) => {
    setItem((prevItem) => ({
      ...prevItem,
      photos: prevItem.photos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch('/facesitem', {item: id, categories: selectedFacesCategory})
      await axios.patch(`/item?id=${id}`, item).then((res) => {
        if (res.status === 200) {
          navigate(`/item/${id}`)
        }
      });
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Error updating item");
    }
  };

  const handleCheckboxChangeFace = (collection) =>{
    setSelectFacesCategory((prevSelected) =>
      prevSelected.includes(collection)
        ? prevSelected.filter((id) => id !== collection)
        : [...prevSelected, collection]
    );
  }

  const handleCheckboxChange = async (collectionId, type) => {
    if (type === "collections") {
      setSelectedCollections((prevSelected) =>
        prevSelected.includes(collectionId)
          ? prevSelected.filter((id) => id !== collectionId)
          : [...prevSelected, collectionId]
      );

      try {
        if (selectedCollections.includes(collectionId)) {
          await axios.delete("/collection", { params: { _id: collectionId, item: id } });
        } else {
          await axios.patch("/collection", { _id: collectionId, item: id });
        }
      } catch (error) {
        console.error(`Error updating collection ${collectionId}:`, error);
      }
    } else if (type === "sales") {
      setSelectedSales((prevSelected) =>
        prevSelected.includes(collectionId)
          ? prevSelected.filter((id) => id !== collectionId)
          : [...prevSelected, collectionId]
      );

      try {
        if (selectedSales.includes(collectionId)) {
          await axios.delete("/sale", { params: { _id: collectionId, item: id } });
        } else {
          await axios.patch("/sale", { _id: collectionId, item: id });
        }
      } catch (error) {
        console.error(`Error updating sale ${collectionId}:`, error);
      }
    }
  };

  return (
    <div className="bg-back min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full sm:max-w-lg overflow-y-auto">
        <h2 className="text-2xl font-bold text-main mb-6">Редактировать товар</h2>
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
              value={item.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
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
              value={item.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
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
              value={item.category._id}
              onChange={handleChange}
              className="mt-1 block w-full border p-2 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
            >
              <option value="">Выберите категорию</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {/* Бренд */}
          <div className="">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
              Бренд:
            </label>
            <select
              id="brand"
              name="brand"
              value={item.brand._id}
              onChange={handleChange}
              className="mt-1 block w-full border p-2 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
            >
              <option value="">Выберите бренд</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          {/* Фотографии */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Фотографии:</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {item.photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img src={`http://localhost:4444${photo}`} alt={`Photo ${index + 1}`} className="h-20 w-20 object-cover rounded-md" />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-0 right-0 p-1 bg-white text-red-500 rounded-full shadow-md hover:bg-red-100 focus:outline-none"
                  >
                    &#x274C;
                  </button>
                </div>
              ))}
            </div>
            <input
              type="file"
              onChange={handleNewPhotoChange}
              className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
            />
            <button
              type="button"
              onClick={handleAddPhoto}
              className="mt-2 px-4 py-2 bg-main text-white font-bold rounded shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-main"
            >
              Добавить фото
            </button>
          </div>
          {/* Цены */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Цены:</label>
            {item.price.map((price, index) => (
              <input
                key={index}
                type="number"
                value={price}
                onChange={(e) => handlePriceChange(index, e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm mb-2"
              />
            ))}
          </div>
          {/* В наличии */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              В наличии:
            </label>
            <input
              id="stock"
              type="number"
              name="stock"
              value={item.stock}
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
              value={item.sold}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
            />
          </div>
          {/* Скрыто */}
          <div className="flex items-center">
            <input
              id="disabled"
              type="checkbox"
              name="disabled"
              checked={item.disabled}
              onChange={handleChange}
              className="mr-2 focus:ring-main"
            />
            <label htmlFor="disabled" className="text-sm font-medium text-gray-700">
              Скрыто
            </label>
          </div>
          {/* Подборки */}
          <div className="border shadow p-4 rounded-xl">
            <label className="block text-sm font-medium text-gray-700">Подборки:</label>
            <div className="flex flex-col mt-2 max-h-40 overflow-y-auto">
              {categoryFaces?.map((collection) => {
                return (
                  <div key={collection._id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`collection-${collection._id}`}
                      checked={selectedFacesCategory.includes(collection._id)}
                      onChange={() => handleCheckboxChangeFace(collection._id)}
                      className="mr-2 focus:ring-main w-1/4"
                    />
                    <label htmlFor={`collection-${collection._id}`} className="text-sm w-3/4 font-medium text-gray-700">
                      {collection.name}
                    </label>
                  </div>
                )
              })}
              {allCollections.filter(el => el.face !== true).map((collection) => (
                <div key={collection._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`collection-${collection._id}`}
                    checked={selectedCollections.includes(collection._id)}
                    onChange={() => handleCheckboxChange(collection._id, "collections")}
                    className="mr-2 focus:ring-main w-1/4"
                  />
                  <label htmlFor={`collection-${collection._id}`} className="text-sm w-3/4 font-medium text-gray-700">
                    {collection.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* Акции */}
          <div className="border shadow p-4 rounded-xl">
            <label className="block text-sm font-medium text-gray-700">Акции:</label>
            <div className="flex flex-col mt-2 max-h-40 overflow-x-auto overflow-y-auto">
              {allSales.map((sale) => (
                <div key={sale._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`sale-${sale._id}`}
                    checked={selectedSales.includes(sale._id)}
                    onChange={() => handleCheckboxChange(sale._id, "sales")}
                    className="mr-2 focus:ring-main w-1/4"
                  />
                  <label htmlFor={`sale-${sale._id}`} className="text-sm w-3/4 font-medium text-gray-700">
                    {sale.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* Кнопка Сохранить */}
          <button
            type="submit"
            className="mt-4 w-full px-4 py-2 bg-main text-white font-bold rounded shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-main"
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;

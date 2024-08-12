import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import { useParams, useNavigate } from "react-router-dom";
import module from "./categoryPage.module.css";
import Loader from "../../components/loader/Loader";
import Subcategory from "./Subcategory";

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    engName: "",
    disabled: false,
  });
  // const [newSubcategory, setNewSubcategory] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [editSubcategory, setEditSubcategory] = useState({
  //   _id: "",
  //   name: "",
  //   engName: "",
  //   disabled: false,
  // });
  const navigate = useNavigate();

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`/category-by-id`, {
        params: { id: id },
      });
      if (response.data) {
        setCategory(response.data);
        setFormData({
          name: response.data.name,
          engName: response.data.engName,
          disabled: response.data.disabled,
        });
        setSubcategories(response.data.subcategories);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/category?_id=${id}`, { ...formData });
      navigate(`/category/${id}`);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/category`, { params: { _id: id, sub: false } });
      navigate("/categories");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEnableCategory = async () => {
    try {
      await axios.patch(`/enable-category?_id=${id}&sub=false`);
      navigate("/categories");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-back min-h-screen flex flex-col items-center justify-center">
  <div className="bg-white rounded-lg shadow-md p-8 w-full sm:max-w-3xl">
    <h1 className="text-2xl font-bold text-main mb-6">Редактировать категорию</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="name" className="font-semibold">Название:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Название"
          value={formData.name}
          onChange={handleChange}
          className="border-gray-300 border rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-main"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="engName" className="font-semibold">Английское название:</label>
        <input
          type="text"
          id="engName"
          name="engName"
          placeholder="Английское название"
          value={formData.engName}
          onChange={handleChange}
          className="border-gray-300 border rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-main"
        />
      </div>
      <Subcategory
        subcategories={subcategories}
        fetchCategory={fetchCategory}
        id={id}
      />
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-main text-white px-4 py-2 rounded-md shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-main"
        >
          Сохранить
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Скрыть
        </button>
        <button
          type="button"
          onClick={handleEnableCategory}
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Раскрыть
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

export default CategoryPage;

import { useEffect, useState } from "react";
import module from "./items.module.scss";
import axios from "../../../axios";
import ItemCard from "./ItemCard";
import { NavLink } from "react-router-dom";

const ItemsPage = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("/category", { params: { sub: false } })
      .then((res) => {
        setAllCategories(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get("/item")
      .then((res) => {
        setAllItems(res.data);
        setSelectedItems(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCatId = event.target.value;
    if (selectedCatId === "") {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setSelectedItems(allItems);
    } else {
      const selectedCat = allCategories.find(
        (item) => item._id === selectedCatId
      );
      setSelectedCategory(selectedCat);
      setSelectedSubCategory(null);
      setSelectedItems(allItems.filter((item) => item.category._id === selectedCatId));
    }
    setSearchTerm(""); // Clear search term when category is changed
  };

  const handleSubCategoryChange = (event) => {
    const selectedSubCatId = event.target.value;
    const selectedSubCat = selectedCategory.subcategories.find(
      (subCat) => subCat._id == selectedSubCatId
    );
    setSelectedSubCategory(selectedSubCat);

    setSelectedItems(
      allItems.filter((el) => el.subcategory && el.subcategory._id == selectedSubCatId)
    );
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setSelectedItems(
      allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          item._id.includes(searchTerm)
      )
    );
  };

  return (
    <div className={`bg-back min-h-screen p-4 flex flex-col`}>
      <div>
        <select
          className={`bg-white border border-gray-300 rounded-md py-2 px-4 mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent`}
          onChange={handleCategoryChange}
          value={selectedCategory ? selectedCategory._id : ""}
        >
          <option value="">
            Выберите категорию
          </option>
          {allCategories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>

        {selectedCategory && (
          <select
            className={`bg-white border border-gray-300 rounded-md ml-4 py-2 px-4 mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent`}
            onChange={handleSubCategoryChange}
            value={selectedSubCategory ? selectedSubCategory._id : ""}
          >
            <option value="" disabled>
              Выберите подкатегорию
            </option>
            {selectedCategory.subcategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Поиск по названию или ID"
          value={searchTerm}
          onChange={handleSearchChange}
          className="bg-white border border-gray-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
        />
      </div>

      <button
        className={`bg-main hover:bg-opacity-80 text-white font-bold w-fit py-2 mb-8 px-4 rounded shadow-lg transform transition-transform duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-main`}
      >
        <NavLink to={"/items/add-item"} className={'text-white'}>Добавить товар</NavLink>
      </button>

      {selectedItems.map((el) => (
        <ItemCard
          key={el._id}
          id={el._id}
          categoryName={el.category.name}
          description={el.description}
          disabled={el.disabled}
          name={el.name}
          photos={el.photos}
          price={el.price[1]}
          sold={el.sold}
          stock={el.stock}
          reviews={el.reviews}
        />
      ))}
    </div>
  );
};

export default ItemsPage;

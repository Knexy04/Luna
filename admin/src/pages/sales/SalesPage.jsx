import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import styles from "./SalesPage.module.scss";
import { NavLink } from "react-router-dom";

const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get("/sales");
        setSales(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="bg-back min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 w-full sm:max-w-3xl">
          <div className="flex justify-between mb-4">
            <NavLink to={`/sale/add`} className="inline-block">
              <button className="px-4 py-2 bg-main text-white font-bold rounded shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-main">
                Добавить акцию
              </button>
            </NavLink>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sales.map((sale) => (
              <NavLink
                key={sale._id}
                to={`/sale/${sale._id}`}
                className="block"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img
                    src={sale.photo}
                    alt={sale.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-main mb-2">
                      {sale.name}
                    </h2>
                    <h3 className="text-sm text-gray-600 mb-2">
                      {sale.subtitle}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {new Date(sale.start).toLocaleDateString()} -{" "}
                      {new Date(sale.end).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Скрыто: {sale.disabled ? "Да" : "Нет"}
                    </p>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesPage;

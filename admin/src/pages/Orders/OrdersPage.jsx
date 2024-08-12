import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import { NavLink } from "react-router-dom";
import styles from "./OrdersPage.module.scss";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchId]);

  useEffect(() => {
    handleSort();
  }, [sortOrder, orders]);

  const fetchOrders = () => {
    axios
      .get("/orders")
      .then((res) => {
        setOrders(res.data);
        setFilteredOrders(res.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  const handleSearch = () => {
    if (searchId) {
      setFilteredOrders(orders.filter((order) => order._id.includes(searchId)));
    } else {
      setFilteredOrders(orders);
    }
  };

  const handleSort = () => {
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
    setFilteredOrders(sortedOrders);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="bg-back min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full sm:max-w-3xl">
        <h1 className="text-2xl font-bold text-main mb-6">Заказы</h1>
        <div className="flex items-center justify-between mb-4">
          <div className="flex justify-between w-full space-x-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
                placeholder="Поиск по ID"
              />
            </div>
            <button
              onClick={toggleSortOrder}
              className="px-4 py-2 bg-main text-white font-bold rounded shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-main"
            >
              Отсортировано по дате (
              {sortOrder === "asc" ? "Новые сперва" : "Последние сперва"})
            </button>
          </div>
        </div>
        <ul className="space-y-4">
          {filteredOrders.map((order) => (
            <NavLink key={order._id} to={`/order/${order._id}`}>
              <li className="bg-white shadow-md rounded-lg p-4 border border-gray-200 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className="text-main font-semibold">
                        {order.status[0].statusName}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">ID:</span> {order._id}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Дата:</span>{" "}
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Цена:</span> {order.price} руб.
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Тип доставки:</span>{" "}
                      {order.delivery}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Способ платежа:</span>{" "}
                      {order.payment}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Оплачено:</span>{" "}
                      {order.paid ? "Да" : "Нет"}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Адрес:</span>{" "}
                      {order.addres}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Трек номер:</span>{" "}
                      {order.track}
                    </div>
                  </div>
                  <div className="flex-1">
                    <ol>
                      {order.items?.map((item) => (
                        <li key={item._id} className="mb-2">
                          <a
                            href={`/item/${item._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-main font-semibold"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrdersPage;

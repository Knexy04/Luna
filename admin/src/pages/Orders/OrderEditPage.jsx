import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../axios";
import styles from "./OrderEditPage.module.scss";

const OrderEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [track, setTrack] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`/order/${id}`)
      .then((res) => {
        setOrder(res.data[0]);
        setStatus(res.data[0].status[0]._id);
        setTrack(res.data[0].track);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }, [id]);

  const handleSave = async () => {
    try {
      const res = await axios.patch(`/order/${id}`, { status, track });
      if (res.status === 200) {
        navigate("/orders");
      }
    } catch (e) {
      console.error("Error updating order:", e);
      setError("Произошла ошибка при обновлении заказа");
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  const statuses = [
    {
      id: "65ca4c4e1ff3a5e4adce83af",
      name: "В обработке",
    },
    {
      id: "65cb0712e5caa22f619e37a8",
      name: "Отправлен",
    },
    {
      id: "65cb071b5f76325f802525d4",
      name: "Доставлен",
    },
  ];

  return (
    <div className="bg-back flex flex-col items-center justify-center">
  <div className="bg-white rounded-lg shadow-md p-8 w-full sm:max-w-3xl">
    <h1 className="text-2xl font-bold text-main mb-6">Редактировать заказ</h1>
    {error && <div className="text-red-600 mb-4">{error}</div>}
    <div className="mb-4">
      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
        Статус
      </label>
      <select
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="block w-full border shadow p-2 border-gray-300 rounded-md focus:ring-main focus:border-main sm:text-sm"
      >
        {statuses.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
    </div>
    <div className="mb-4">
      <label htmlFor="track" className="block text-sm font-medium text-gray-700 mb-1">
        Трек номер
      </label>
      <input
        type="text"
        id="track"
        value={track}
        onChange={(e) => setTrack(e.target.value)}
        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-main focus:border-main sm:text-sm"
      />
    </div>
    <button
      onClick={handleSave}
      className="w-full bg-main text-white py-2 px-4 rounded-md font-semibold shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-main"
    >
      Сохранить
    </button>
  </div>
</div>
  );
};

export default OrderEditPage;

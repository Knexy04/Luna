import React from 'react';
import { NavLink } from 'react-router-dom';

const ItemCard = ({ categoryName, id, description, disabled, name, photos, price, sold, stock, reviews }) => {
  return (
    <NavLink to={`/item/${id}`}>
      <div className="border shadow rounded-xl p-4 mb-6">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p><strong>Категория:</strong> {categoryName}</p>
        <p><strong>Описание:</strong> {description}</p>
        <p><strong>Скрыто:</strong> {disabled ? 'Да' : 'Нет'}</p>
        <p><strong>Цена:</strong> {price} руб.</p>
        <p><strong>На складе:</strong> {stock} единиц</p>
        <p><strong>Продано:</strong> {sold} единиц</p>
        <div className="flex items-center gap-2 mt-2">
          {photos.map((photo, index) => (
            <img className="h-52 w-auto object-cover rounded-md" src={`${import.meta.env.VITE_HOST}${photo}`} alt={`Photo ${index}`} key={index} />
          ))}
        </div>
        <p><strong>Отзывов:</strong> {reviews.length}</p>
      </div>
    </NavLink>
  );
};

export default ItemCard;

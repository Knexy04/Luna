import module from "./menu.module.scss";
import { useEffect, useState } from "react";
import { authService } from "../../services/auth.service.js";
import Loader from "../loader/Loader.jsx";
import { Link, Outlet } from "react-router-dom";

export const Menu = () => {
  const buttons = [
    {
      name: "Главная",
      icon: (
        <svg
          width="24"
          height="24"
          fill="#1a1a1a"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m18.36 9 .6 3H5.04l.6-3h12.72ZM20 4H4v2h16V4Zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5ZM6 18v-4h6v4H6Z"></path>
        </svg>
      ),
      link: "/",
    },
    {
      name: "Товары",
      icon: (
        <svg
          width="24"
          height="24"
          fill="#1a1a1a"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m18.36 9 .6 3H5.04l.6-3h12.72ZM20 4H4v2h16V4Zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5ZM6 18v-4h6v4H6Z"></path>
        </svg>
      ),
      link: "/items",
    },
    {
      name: "Бренды",
      icon: (
        <svg
          width="24"
          height="24"
          fill="#1a1a1a"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m18.36 9 .6 3H5.04l.6-3h12.72ZM20 4H4v2h16V4Zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5ZM6 18v-4h6v4H6Z"></path>
        </svg>
      ),
      link: "/brands",
    },
    {
      name: "Заказы",
      icon: (
        <svg
          width="24"
          height="24"
          fill="#1a1a1a"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4.727 6c-.458 0-.897.171-1.221.476A1.578 1.578 0 0 0 3 7.625v8.938h1.727c0 .646.273 1.266.76 1.723a2.676 2.676 0 0 0 1.83.714c.687 0 1.346-.257 1.832-.714a2.367 2.367 0 0 0 .76-1.724h5.18c0 .647.274 1.267.76 1.724a2.676 2.676 0 0 0 1.832.714c.687 0 1.346-.257 1.832-.714a2.366 2.366 0 0 0 .759-1.724H22V12.5l-2.59-3.25h-2.592V6H4.728Zm6.046 1.625 3.454 3.25-3.454 3.25v-2.438H5.59v-1.624h5.182V7.624Zm6.045 2.844h2.16l1.7 2.031h-3.86v-2.031Zm-9.5 4.875c.344 0 .673.128.916.357.243.228.38.538.38.861 0 .324-.137.634-.38.862a1.338 1.338 0 0 1-.916.357c-.343 0-.673-.128-.916-.357a1.183 1.183 0 0 1-.38-.861c0-.324.137-.634.38-.862.243-.229.573-.357.916-.357Zm10.364 0c.343 0 .673.128.916.357.243.228.38.538.38.861 0 .324-.137.634-.38.862a1.338 1.338 0 0 1-.916.357c-.344 0-.673-.128-.916-.357a1.184 1.184 0 0 1-.38-.861c0-.324.137-.634.38-.862.243-.229.572-.357.916-.357Z"></path>
        </svg>
      ),
      link: "/orders",
    },
    {
      name: "Категории",
      icon: (
        <svg
          width="24"
          height="24"
          fill="#1a1a1a"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11.5 2 6 11h11l-5.5-9Zm0 3.84L13.43 9H9.56l1.94-3.16ZM17 13c-2.49 0-4.5 2.01-4.5 4.5S14.51 22 17 22s4.5-2.01 4.5-4.5S19.49 13 17 13Zm0 7a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5ZM2.5 21.5h8v-8h-8v8Zm2-6h4v4h-4v-4Z"></path>
        </svg>
      ),
      link: "/categories",
    },
    {
      name: "Акции",
      icon: (
        <svg
          width="24"
          height="24"
          fill="#1a1a1a"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4Zm-6 4h-4v-4h4v4Z"></path>
        </svg>
      ),
      link: "/sales",
    },
    {
      name: "Подборки",
      icon: (
        <svg
          width="24"
          height="24"
          fill="#1a1a1a"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 4v12H8V4h12Zm0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm-8.5 9.67 1.69 2.26 2.48-3.1L19 15H9l2.5-3.33ZM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2Z"></path>
        </svg>
      ),
      link: "/collections",
    },
    {
      name: "Лицо",
      icon: (
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM7.75 13a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Zm6 0a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0ZM4 12c0 4.41 3.59 8 8 8s8-3.59 8-8c0-.79-.12-1.55-.33-2.26A9.974 9.974 0 0 1 9.26 5.77c-.98 2.39-2.85 4.32-5.21 5.37-.03.28-.05.57-.05.86Z" clip-rule="evenodd"></path>
        </svg>
      ),
      link: "/face",
    },
  ];

  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //     const fetchUser = async () => {
  //         try {
  //             await authService.getUser();
  //             setIsLoading(false);
  //         } catch (e) {
  //             setIsLoading(false);
  //         }
  //     };
  //     fetchUser();
  // }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className={module.header}>
        {buttons.map((button) => (
          <Link
            className={module.headerButton}
            key={button.link}
            to={button.link}
          >
            {button.icon} <p>{button.name}</p>
          </Link>
        ))}
      </div>
      <div className={module.main}>
        <Outlet />
      </div>
    </>

  );
};

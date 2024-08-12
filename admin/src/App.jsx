import "./App.scss";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../axios";
import xlsx from "json-as-xlsx";

function App() {
  const handleGetPhoneNumbers = async () => {
    const response = await axios.get("/all-phone-numbers");

    const data = [
      {
        sheet: "All Phone Numbers",
        columns: [
          {
            label: "Phone Number",
            value: "phoneNumber",
          },
        ],
        content: response.data,
      },
    ];

    let settings = {
      fileName: "All Phone Numbers",
    };

    xlsx(data, settings);
  };

  const handleExit = () => {
    localStorage.removeItem("token")
    window.location.href="/auth"
  }

  return (
    <>
      <main
        className={"page w-full flex justify-center items-center"}
      >
        <button
          onClick={handleGetPhoneNumbers}
          className="bg-main hover:bg-opacity-80 text-white py-2 px-4 rounded shadow-lg transform transition-transform duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-main"
        >
          Экспортировать номера телефонов
        </button>
        {/* <button onClick={handleExit}>exit</button> */}
      </main>
    </>
  );
}

export default App;

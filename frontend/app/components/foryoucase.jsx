"use client"; // Добавьте эту строку в начало файла

import Link from "next/link";
import { mdilArrowRight } from "@mdi/light-js";
import Icon from "@mdi/react";
import ItemSliderForYou from "@/app/components/itemsliderforyou";
import { useState, useEffect } from "react";
import axios from "../../axios";

const ForYouCase = ({ id, name }) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios.get("/collections")
      .then((res) => {
        let collectionsArr = [];
        console.log(res.data);
  
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].disabled === false) {
            collectionsArr.push(res.data[i]);
            if (collectionsArr.length >= 3) {
              setCollections(collectionsArr);
              return;
            }
          }
        }
  
        setCollections(collectionsArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className={"flex justify-between items-center mb-4 px-4 sm:px-8 lg:px-20"}>
        <article className={"text-xl font-semibold"}>{name}</article>
        <Link className={"rounded-3xl flex gap-4 bg-main p-2 px-4 hover:bg-opacity-70 transition-all shadow"}
              href={`/collections`}>смотреть все<Icon path={mdilArrowRight} size={1} /></Link>
      </div>
      <ItemSliderForYou items={collections} />
    </div>
  );
};

export default ForYouCase;

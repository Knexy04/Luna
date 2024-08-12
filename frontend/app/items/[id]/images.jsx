"use client";
import Image from "next/image";
import module from './item.module.css';
import { useState, useEffect } from "react";

const Images = (props) => {
  const [mainPhoto, setMainPhoto] = useState(props.doc.photos[0]);
  const [animate, setAnimate] = useState(false);

  const handleThumbnailClick = (newMainPhoto) => {
    setAnimate(true);
    setTimeout(() => {
      setMainPhoto(newMainPhoto);
      setAnimate(false);
    }, 300); // Adjust the duration to match your transition time
  };

  useEffect(() => {
    return () => {
      setAnimate(false);
    };
  }, []);

  return (
    <div className={`${module.itemPhotos} flex`}>
      <div className={`${module.leftPanelPhotos} flex flex-col gap-2 xl:mr-4 mr-2`}>
        {props.doc.photos.map((photo, index) => (
          <Image
            key={index}
            src={process.env.NEXT_PUBLIC_HOST + photo}
            width={100}
            height={110}
            className={`card-img-panel cursor-pointer w-[100px] h-[110px] ${module.cardImgLeft}`}
            alt={props.doc.name}
            onClick={() => handleThumbnailClick(photo)}
          />
        ))}
      </div>
      <div className={`${module.mainPhoto} ${animate ? `${module.animate}` : ''}`}>
        <Image
          src={process.env.NEXT_PUBLIC_HOST + mainPhoto}
          width={424}
          height={500}
          className={`${module.cardImgMain} w-[424px] h-[500px]`}
          alt={props.doc.name}
        />
      </div>
    </div>
  );
};

export default Images;

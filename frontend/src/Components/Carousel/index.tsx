import React, { useState } from "react";

import { IImage } from "../../App";

import "./index.css";

interface ICarousel {
  images: IImage[];
}
export default function Carousel({ images }: ICarousel) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderSlide = () => {
    const currentImage = images[currentIndex];

    return <img src={currentImage.url} alt={currentImage.title} />;
  };

  return (
    <div className="carousel-container">
      <button className="prev-button" onClick={goToPrevSlide}>
        &lt;
      </button>
      {renderSlide()}
      <button className="next-button" onClick={goToNextSlide}>
        &gt;
      </button>
    </div>
  );
}

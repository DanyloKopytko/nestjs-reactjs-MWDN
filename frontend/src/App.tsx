import React, { useState, useEffect } from "react";

import Carousel from "./Components/Carousel";
import Gallery from "./Components/Gallery";

import "./App.css";

enum LayoutType {
  CAROUSEL = "CAROUSEL",
  GALLERY = "GALLERY",
}

export interface IImage {
  id: number;
  title: string;
  url: string;
}

const imagesEndpoint = `${process.env.REACT_APP_SERVER_URL}/images`;

function App() {
  const [layout, setLayout] = useState<LayoutType>(LayoutType.GALLERY);
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    (async () => {
      setImages(await (await fetch(imagesEndpoint)).json());
    })();
  }, []);

  const changeLayout = () =>
    setLayout((prevState) =>
      prevState === LayoutType.CAROUSEL
        ? LayoutType.GALLERY
        : LayoutType.CAROUSEL
    );

  const renderLayout = () => {
    switch (layout) {
      case LayoutType.CAROUSEL: {
        return <Carousel images={images} />;
      }

      case LayoutType.GALLERY: {
        return <Gallery images={images} />;
      }
    }
  };

  if (!images.length) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <button onClick={changeLayout}>Change Layout</button>
      {renderLayout()}
    </div>
  );
}

export default App;

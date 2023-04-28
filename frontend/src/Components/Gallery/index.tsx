import { IImage } from "../../App";

import "./index.css";

interface IGallery {
  images: IImage[];
}

export default function Gallery({ images }: IGallery) {
  return (
    <div className="gallery-container">
      {images.map((image) => (
        <div key={image.id} className="gallery-item">
          <img className="gallery-image" src={image.url} alt={image.title} />
          <div className="title">{image.title}</div>
        </div>
      ))}
    </div>
  );
}

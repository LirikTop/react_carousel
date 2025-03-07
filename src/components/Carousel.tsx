import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProp {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<CarouselProp> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [current, setCurrent] = useState<number>(0);

  const checkNext = () => {
    if (infinite) {
      if (current + step < images.length) {
        setCurrent(current + step);
      } else {
        // setCurrent(0 + step);
        setCurrent((current + step) % images.length);
      }
    } else {
      if (current + step < images.length) {
        setCurrent(current + step);
      }
    }
  };

  const checkPrev = () => {
    if (infinite) {
      if (current - step >= 0) {
        setCurrent(current - step);
      } else {
        // setCurrent(images.length - step);
        setCurrent((images.length + current - step) % images.length);
      }
    } else {
      if (current - step >= 0) {
        setCurrent(current - step);
      }
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__content"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translate(-${itemWidth * current}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map((image, index) => (
            <li key={index}>
              <img
                src={image}
                alt={`${index + 1}`}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
        <div className="Carousel__buttons">
          <button type="button" onClick={checkPrev}>
            Prev
          </button>
          <button data-cy="next" type="button" onClick={checkNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;

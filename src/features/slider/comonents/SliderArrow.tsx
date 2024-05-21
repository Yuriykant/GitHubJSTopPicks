import React, { FC } from 'react';
import { ArrowLeft } from '@images/ArrowLeft';
import './Slider.css';
import { ArrowRight } from '@images/ArrowRight';

type Position = 'left' | 'right';

interface SliderProp {
  position?: Position;
  onClick?: () => void;
}

export const SliderArrow: FC<SliderProp> = ({ position = 'right', onClick }) => {
  return (
    <>
      <div className="slider__arrow-container" onClick={onClick}>
        {position === 'right' ? <ArrowRight /> : <ArrowLeft />}
      </div>
    </>
  );
};

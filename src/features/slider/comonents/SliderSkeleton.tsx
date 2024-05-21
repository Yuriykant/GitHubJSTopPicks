import React, { FC } from 'react';
import { SliderArrow } from './SliderArrow';

import './Slider.css';
import { StarIcon } from '@images/StarIcon';
import { ForkIcon } from '@images/ForkIcon';
import { SkeletonText } from '@Components/SkeletonText/SkeletonText';

interface SliderSkeletonProps {
  hasImage?: boolean;
  hasDescription?: boolean;
  className?: string;
}

export const SliderSkeleton: FC<SliderSkeletonProps> = () => {
  return (
    <div className="slider">
      <SliderArrow position={'left'} />
      <div className="slider__content-wrapper">
        <h2 className="slider__title">
          <SkeletonText accent />
        </h2>
        <div className="slider__description">
          <SkeletonText rowsCount={2} />
        </div>
        <div className="slider__repo_info">
          <div className="slider__repo-elem ">
            <StarIcon />
            <SkeletonText short />
          </div>
          <div className="slider__repo-elem">
            <ForkIcon />
            <SkeletonText short />
          </div>
        </div>
      </div>
      <SliderArrow />
    </div>
  );
};
